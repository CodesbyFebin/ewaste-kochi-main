#!/usr/bin/env python3
"""
generate-pillar-page.py
=======================

Spec-driven Astro pillar-page generator for the ewastekochi-v2 codebase.

Reads a YAML or JSON spec describing ONE pillar page and renders an Astro file
that matches the exact template pattern used by the 5 pillar pages shipped
2026-07-27 (/laptop-recycling/, /computer-recycling/, /mobile-phone-recycling/,
/corporate-e-waste-recycling/, /office-e-waste-pickup/):

  * Layout + Breadcrumbs + CtaBar + Faq + DirectAnswer component stack
  * Service + HowTo + WebPage + BreadcrumbList JSON-LD (+ FAQPage via <Faq>)
  * @id-linked to https://www.ewastekochi.com/#organization
  * Lede + BLUF DirectAnswer + key-takeaways + accepted-items table +
    step-list + section list + FAQ + related-pages + CtaBar
  * Optional append into src/data/routes.ts (with --register-route)

Deliberately NOT an LLM content generator. This script never calls any
external model. Content is 1:1 with the spec you write. This is by design and
aligns with the Phase 2L-RETRY anti-fabrication discipline documented in
PROJECT_TRACKER.md and the .gitignore rationale (which excludes
`ewastekochi-v3-chatbot.zip` as "the exact doorway-page pattern this project
has repeatedly rejected").

Safety gates
------------
* Default output goes to .content-quarantine/generated/<path>/index.astro
  (matching the existing BLOG SCALE SAFETY GATE convention). Use --live to
  write directly to src/pages/.
* --force is required to overwrite an existing file.
* Spec is validated against a hard schema; any missing/invalid field aborts
  before writing anything.
* Every string field is scanned for forbidden phrase patterns pulled straight
  from Phase 2L-RETRY guidance (see FORBIDDEN_PHRASES below). Any hit aborts.
* --register-route surgically inserts a route entry BEFORE the closing `];`
  of BASE_ROUTES in src/data/routes.ts; refuses to run if the path is already
  registered.

Usage
-----
    # 1. Write a spec (start from the sample)
    python3 scripts/generate-pillar-page.py --emit-sample-spec > spec.yaml

    # 2. Validate the spec without writing anything
    python3 scripts/generate-pillar-page.py spec.yaml --validate-only

    # 3. Dry-run: render to stdout, do not write
    python3 scripts/generate-pillar-page.py spec.yaml --dry-run

    # 4. Write to quarantine for human review (default, safe)
    python3 scripts/generate-pillar-page.py spec.yaml

    # 5. Write live + register route (after reviewing the quarantined draft)
    python3 scripts/generate-pillar-page.py spec.yaml --live --register-route

    # 6. Overwrite an existing live page (rare, deliberate)
    python3 scripts/generate-pillar-page.py spec.yaml --live --force

Exit codes
----------
* 0 — success
* 1 — usage error (bad CLI args)
* 2 — spec validation failed
* 3 — forbidden-phrase hit
* 4 — refused to overwrite (missing --force)
* 5 — refused to register duplicate route
* 6 — file write failed

Dependencies
------------
* Python 3.8+
* PyYAML (only if you pass a .yaml/.yml spec; JSON specs need only stdlib).
  Install with:  python3 -m pip install --user pyyaml   (or use JSON)

Author: generated 2026-07-28 alongside the 5-pillar-page batch.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import textwrap
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable, Optional

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

# Word-count bounds. Below MIN we WARN (still write); below HARD_MIN we ABORT.
WORD_COUNT_HARD_MIN = 800
WORD_COUNT_SOFT_MIN = 1_200
WORD_COUNT_TARGET = 2_500
WORD_COUNT_SOFT_MAX = 4_500
WORD_COUNT_HARD_MAX = 8_000  # anything above this is almost certainly a bug

# Character bounds for SERP-visible fields.
TITLE_HARD_MAX = 70
TITLE_SOFT_MAX = 60
DESC_HARD_MAX = 165
DESC_SOFT_MAX = 155

# Minimum content depth thresholds (below these we warn but still write).
MIN_ACCEPTED_ROWS = 3
MIN_HOWTO_STEPS = 3
MIN_SECTIONS = 3
MIN_FAQS = 6
MIN_RELATED = 4
MIN_KEY_TAKEAWAYS = 3

# Phrases forbidden in ANY string field of the spec. Rationale attached.
# Every entry is a case-insensitive substring match. Whitelist by adding a
# `verified_claims:` block to the spec (see the schema).
FORBIDDEN_PHRASES: list[tuple[str, str]] = [
    # Softened per Phase 2L-RETRY (see PROJECT_TRACKER.md GSC-P3 phase).
    ("instant quote", "Phase 2L-RETRY: use 'condition-based estimate; confirmed quote after inspection' instead"),
    ("on-the-spot quote", "Phase 2L-RETRY: use 'condition-based estimate; confirmed quote after inspection' instead"),
    ("instant cash", "Phase 2L-RETRY: use 'payment on the spot for accepted quotes' instead"),
    ("guaranteed pickup", "Phase 2L-RETRY: use 'feasibility check' or 'pickup for eligible collections' instead"),
    ("same-day guaranteed", "Phase 2L-RETRY: use 'same-day where feasible' or 'confirmed after slot review' instead"),
    ("always free", "Phase 2L-RETRY: use 'free for eligible collections' instead"),
    ("100% free", "Phase 2L-RETRY: use 'free for eligible collections' instead"),
    # Anti-fabrication: no specific compliance numbers without a verified_claims entry.
    ("KL/EW/628", "Anti-fabrication: put in verified_claims: block with citation_source; do NOT inline into body copy"),
    ("KSPCB reg", "Anti-fabrication: put actual reg number in verified_claims: with citation_source"),
    # Anti-fabrication: no fake ratings/reviews.
    ("4.9/5", "Anti-fabrication: no rating claims without a real, first-party source; use verified_claims:"),
    ("500+ reviews", "Anti-fabrication: no review-count claims without a verified source"),
    # Anti-fabrication: no unverified years-in-business claims.
    ("since 2015", "Anti-fabrication: 'since YYYY' must live in verified_claims:"),
    ("10+ years", "Anti-fabrication: 'X+ years' claims must live in verified_claims:"),
    # Anti-fabrication: no bare authority claims.
    ("government authorized", "Anti-fabrication: bare authority claims not allowed; use 'KSPCB registration on request'"),
    ("government approved", "Anti-fabrication: bare authority claims not allowed"),
    ("most trusted", "Anti-fabrication: superlative not allowed without a verified survey source"),
    ("#1 in Kochi", "Anti-fabrication: superlative not allowed"),
    ("best in Kerala", "Anti-fabrication: superlative not allowed"),
    # No template-variable leaks (I've seen these on the old static site).
    ("${title}", "Template leak: literal ${title} in output means the spec-render pipeline is broken"),
    ("${description}", "Template leak: literal ${description} in output"),
]

# Regex patterns forbidden in ANY string field of the spec.
# Deliberately targeted to hit *authority/tenure* claims only. Product-age
# phrases like "5-7 years old" or "under 3 years" are legitimate and must NOT
# trip these patterns — those describe the appliance/device, not the business.
FORBIDDEN_PATTERNS: list[tuple[re.Pattern[str], str]] = [
    # Ratings
    (re.compile(r"\b\d{1,3}\.\d+/5\b"), "Rating claim (X.Y/5) not allowed inline; use verified_claims:"),
    (re.compile(r"\b\d{2,}\+? reviews\b", re.IGNORECASE), "Review-count claim not allowed inline"),
    # Year-founded / years-in-business — narrowly scoped to phrases that ARE
    # business-tenure claims, not neutral time references.
    (re.compile(r"\b(?:since|est\.?|established)\s+(?:19|20)\d{2}\b", re.IGNORECASE), "Year-founded claim needs verified_claims:"),
    # "X+ years" is a tenure claim only when NOT followed by "old", "ago",
    # "from now", or "warranty" (which are product-age / time-reference uses).
    (re.compile(r"\b\d+\+\s*years?\b(?!\s+(?:old|ago|from\s+now|warranty))", re.IGNORECASE), "'X+ years' tenure claim needs verified_claims:"),
    (re.compile(r"\bover\s+\d+\s+years?\b", re.IGNORECASE), "'Over X years' tenure claim needs verified_claims:"),
    (re.compile(r"\b\d+\s+years?\s+of\s+(?:experience|business|service|operation|expertise)\b", re.IGNORECASE), "'X years of experience' claim needs verified_claims:"),
    (re.compile(r"\b\d+\s+years?\s+in\s+(?:business|the\s+industry|kochi|kerala)\b", re.IGNORECASE), "'X years in business' claim needs verified_claims:"),
    # Suspicious markdown/HTML that shouldn't be in a spec (Astro renders differently).
    (re.compile(r"<script\b", re.IGNORECASE), "Raw <script> in spec is unsafe; use jsonLd fields instead"),
]

# Valid URL path pattern: /segment/ or /segment/sub-segment/
PATH_PATTERN = re.compile(r"^/[a-z0-9]+(?:-[a-z0-9]+)*(?:/[a-z0-9]+(?:-[a-z0-9]+)*)*/$")

# Where quarantined drafts land (matches BLOG SCALE SAFETY GATE convention).
QUARANTINE_ROOT_REL = ".content-quarantine/generated"

# Where live pages go.
LIVE_PAGES_ROOT_REL = "src/pages"

# routes.ts path.
ROUTES_TS_REL = "src/data/routes.ts"

# Site URL constant (matches src/data/site.ts SITE_URL).
SITE_URL = "https://www.ewastekochi.com"


# ---------------------------------------------------------------------------
# Spec dataclasses
# ---------------------------------------------------------------------------

@dataclass
class HowToStep:
    name: str
    text: str


@dataclass
class AcceptedItemsTable:
    columns: list[str]
    rows: list[list[str]]


@dataclass
class Section:
    h2: str
    body: str


@dataclass
class Faq:
    q: str
    a: str


@dataclass
class RelatedPage:
    path: str
    label: str


@dataclass
class RouteEntry:
    changefreq: str  # daily|weekly|monthly|yearly
    priority: float  # 0.0-1.0
    type: str  # core|service|location|blog|trust|legal
    sitemap_group: str  # core|services|locations|legal|ml|blog
    lang: str = "en-IN"  # en-IN|ml-IN
    hreflang_pair: Optional[str] = None


@dataclass
class VerifiedClaim:
    """A claim that would otherwise be forbidden but has a documented source."""
    text: str
    citation_source: str  # e.g., "internal document ref REG-2024-11, KSPCB acknowledgement letter"


@dataclass
class PageSpec:
    # Required
    path: str
    title: str
    description: str
    h1: str
    breadcrumb_label: str
    service_type: str
    last_updated: str  # ISO date
    lede: str
    direct_answer: str
    key_takeaways: list[str]
    accepted_items: AcceptedItemsTable
    how_to_steps: list[HowToStep]
    sections: list[Section]
    faqs: list[Faq]
    related_pages: list[RelatedPage]
    route: RouteEntry
    whatsapp_message: str
    # Optional
    verified_claims: list[VerifiedClaim] = field(default_factory=list)
    accepted_items_intro: Optional[str] = None  # text before the table
    accepted_items_outro: Optional[str] = None  # text after the table


# ---------------------------------------------------------------------------
# Spec loading + validation
# ---------------------------------------------------------------------------

class SpecError(Exception):
    """Spec validation error. Message should tell user exactly what to fix."""


def load_spec(path: Path) -> dict[str, Any]:
    """Load a spec from a .yaml/.yml/.json file. YAML requires PyYAML."""
    if not path.exists():
        raise SpecError(f"spec file not found: {path}")
    raw = path.read_text(encoding="utf-8")
    suffix = path.suffix.lower()
    if suffix in (".yaml", ".yml"):
        try:
            import yaml  # type: ignore
        except ImportError as e:
            raise SpecError(
                "PyYAML is required for .yaml/.yml specs.\n"
                "Install with:  python3 -m pip install --user pyyaml\n"
                "Or convert the spec to .json (spec format is identical)."
            ) from e
        try:
            data = yaml.safe_load(raw)
        except yaml.YAMLError as e:
            raise SpecError(f"YAML parse error in {path}: {e}") from e
    elif suffix == ".json":
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            raise SpecError(f"JSON parse error in {path}: {e}") from e
    else:
        raise SpecError(
            f"unsupported spec extension: {suffix}. Use .yaml, .yml, or .json"
        )
    if not isinstance(data, dict):
        raise SpecError(f"spec root must be an object/mapping, got {type(data).__name__}")
    return data


def _require(d: dict[str, Any], key: str, kind: type, where: str = "spec") -> Any:
    if key not in d:
        raise SpecError(f"{where}: missing required field '{key}'")
    val = d[key]
    if not isinstance(val, kind):
        raise SpecError(
            f"{where}: field '{key}' must be {kind.__name__}, got {type(val).__name__}"
        )
    return val


def _optional(d: dict[str, Any], key: str, kind: type, default: Any = None) -> Any:
    if key not in d or d[key] is None:
        return default
    val = d[key]
    if not isinstance(val, kind):
        raise SpecError(
            f"field '{key}' must be {kind.__name__} or omitted, got {type(val).__name__}"
        )
    return val


def parse_spec(data: dict[str, Any]) -> PageSpec:
    """Validate the raw spec dict and construct a typed PageSpec."""

    # -- Top-level required fields --
    path = _require(data, "path", str)
    if not PATH_PATTERN.match(path):
        raise SpecError(
            f"path '{path}' invalid. Must be lowercase, hyphen-separated, "
            f"leading + trailing slash. Example: /appliance-recycling/"
        )

    title = _require(data, "title", str).strip()
    if len(title) < 15:
        raise SpecError(f"title too short ({len(title)} chars). Minimum 15.")
    if len(title) > TITLE_HARD_MAX:
        raise SpecError(
            f"title too long ({len(title)} chars). Hard max {TITLE_HARD_MAX} "
            f"(Google truncates SERP titles beyond ~60 chars on mobile)."
        )

    description = _require(data, "description", str).strip()
    if len(description) < 50:
        raise SpecError(f"description too short ({len(description)} chars). Minimum 50.")
    if len(description) > DESC_HARD_MAX:
        raise SpecError(
            f"description too long ({len(description)} chars). Hard max {DESC_HARD_MAX}."
        )

    h1 = _require(data, "h1", str).strip()
    breadcrumb_label = _require(data, "breadcrumb_label", str).strip()
    service_type = _require(data, "service_type", str).strip()

    last_updated = _require(data, "last_updated", str).strip()
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", last_updated):
        raise SpecError(f"last_updated must be ISO YYYY-MM-DD, got '{last_updated}'")

    lede = _require(data, "lede", str).strip()
    if len(lede.split()) < 50:
        raise SpecError(f"lede too short ({len(lede.split())} words). Aim 80+.")

    direct_answer = _require(data, "direct_answer", str).strip()
    da_words = len(direct_answer.split())
    if da_words < 30 or da_words > 100:
        raise SpecError(
            f"direct_answer must be 30-100 words (yours: {da_words}). "
            f"AI systems lift this verbatim; too short = weak, too long = truncated."
        )

    # -- Lists --
    kt_raw = _require(data, "key_takeaways", list)
    if len(kt_raw) < MIN_KEY_TAKEAWAYS:
        raise SpecError(f"need at least {MIN_KEY_TAKEAWAYS} key_takeaways, got {len(kt_raw)}")
    key_takeaways = [str(x).strip() for x in kt_raw if str(x).strip()]

    # accepted_items
    ai_raw = _require(data, "accepted_items", dict, where="accepted_items")
    ai_cols = _optional(ai_raw, "columns", list, default=["Item type", "Route", "Notes"])
    ai_cols = [str(c) for c in ai_cols]
    if len(ai_cols) < 2:
        raise SpecError("accepted_items.columns must have at least 2 columns")
    ai_rows_raw = _require(ai_raw, "rows", list, where="accepted_items")
    if len(ai_rows_raw) < MIN_ACCEPTED_ROWS:
        raise SpecError(f"need at least {MIN_ACCEPTED_ROWS} accepted_items.rows, got {len(ai_rows_raw)}")
    ai_rows: list[list[str]] = []
    for i, row in enumerate(ai_rows_raw):
        if not isinstance(row, list):
            raise SpecError(f"accepted_items.rows[{i}] must be a list")
        if len(row) != len(ai_cols):
            raise SpecError(
                f"accepted_items.rows[{i}] has {len(row)} cells but columns has {len(ai_cols)}"
            )
        ai_rows.append([str(c).strip() for c in row])
    accepted_items = AcceptedItemsTable(columns=ai_cols, rows=ai_rows)

    accepted_items_intro = _optional(data, "accepted_items_intro", str)
    accepted_items_outro = _optional(data, "accepted_items_outro", str)

    # how_to_steps
    ht_raw = _require(data, "how_to_steps", list)
    if len(ht_raw) < MIN_HOWTO_STEPS:
        raise SpecError(f"need at least {MIN_HOWTO_STEPS} how_to_steps, got {len(ht_raw)}")
    how_to_steps: list[HowToStep] = []
    for i, step in enumerate(ht_raw):
        if not isinstance(step, dict):
            raise SpecError(f"how_to_steps[{i}] must be an object with 'name' and 'text'")
        name = _require(step, "name", str, where=f"how_to_steps[{i}]").strip()
        text = _require(step, "text", str, where=f"how_to_steps[{i}]").strip()
        if len(text.split()) < 6:
            raise SpecError(
                f"how_to_steps[{i}].text too short ({len(text.split())} words); "
                f"aim for at least 12 words so the step is actually useful."
            )
        how_to_steps.append(HowToStep(name=name, text=text))

    # sections
    sec_raw = _require(data, "sections", list)
    if len(sec_raw) < MIN_SECTIONS:
        raise SpecError(f"need at least {MIN_SECTIONS} sections, got {len(sec_raw)}")
    sections: list[Section] = []
    for i, s in enumerate(sec_raw):
        if not isinstance(s, dict):
            raise SpecError(f"sections[{i}] must be an object with 'h2' and 'body'")
        h2 = _require(s, "h2", str, where=f"sections[{i}]").strip()
        body = _require(s, "body", str, where=f"sections[{i}]").strip()
        if len(body.split()) < 40:
            raise SpecError(
                f"sections[{i}] body too short ({len(body.split())} words); "
                f"aim for at least 80 words per H2 section."
            )
        sections.append(Section(h2=h2, body=body))

    # faqs
    fq_raw = _require(data, "faqs", list)
    if len(fq_raw) < MIN_FAQS:
        raise SpecError(f"need at least {MIN_FAQS} faqs, got {len(fq_raw)}")
    faqs: list[Faq] = []
    for i, f in enumerate(fq_raw):
        if not isinstance(f, dict):
            raise SpecError(f"faqs[{i}] must be an object with 'q' and 'a'")
        q = _require(f, "q", str, where=f"faqs[{i}]").strip()
        a = _require(f, "a", str, where=f"faqs[{i}]").strip()
        if not q.endswith("?"):
            raise SpecError(f"faqs[{i}].q must end with '?' (got '{q[:40]}...')")
        if len(a.split()) < 20:
            raise SpecError(
                f"faqs[{i}].a too short ({len(a.split())} words); aim for 30-80 words."
            )
        faqs.append(Faq(q=q, a=a))

    # related_pages
    rp_raw = _require(data, "related_pages", list)
    if len(rp_raw) < MIN_RELATED:
        raise SpecError(f"need at least {MIN_RELATED} related_pages, got {len(rp_raw)}")
    related_pages: list[RelatedPage] = []
    for i, r in enumerate(rp_raw):
        if not isinstance(r, dict):
            raise SpecError(f"related_pages[{i}] must be an object with 'path' and 'label'")
        rp = _require(r, "path", str, where=f"related_pages[{i}]").strip()
        if not rp.startswith("/"):
            raise SpecError(f"related_pages[{i}].path must start with '/' (got '{rp}')")
        label = _require(r, "label", str, where=f"related_pages[{i}]").strip()
        related_pages.append(RelatedPage(path=rp, label=label))

    # route
    r_raw = _require(data, "route", dict, where="route")
    valid_freq = {"daily", "weekly", "monthly", "yearly"}
    changefreq = _require(r_raw, "changefreq", str, where="route")
    if changefreq not in valid_freq:
        raise SpecError(f"route.changefreq must be one of {sorted(valid_freq)}, got '{changefreq}'")
    priority_raw = r_raw.get("priority", 0.8)
    if not isinstance(priority_raw, (int, float)) or not (0.0 <= priority_raw <= 1.0):
        raise SpecError(f"route.priority must be 0.0-1.0 float, got {priority_raw!r}")
    valid_types = {"core", "service", "location", "blog", "trust", "legal"}
    rtype = _require(r_raw, "type", str, where="route")
    if rtype not in valid_types:
        raise SpecError(f"route.type must be one of {sorted(valid_types)}, got '{rtype}'")
    valid_groups = {"core", "services", "locations", "legal", "ml", "blog"}
    sitemap_group = _require(r_raw, "sitemap_group", str, where="route")
    if sitemap_group not in valid_groups:
        raise SpecError(
            f"route.sitemap_group must be one of {sorted(valid_groups)}, got '{sitemap_group}'"
        )
    valid_langs = {"en-IN", "ml-IN"}
    lang = _optional(r_raw, "lang", str, default="en-IN")
    if lang not in valid_langs:
        raise SpecError(f"route.lang must be one of {sorted(valid_langs)}, got '{lang}'")
    hreflang_pair = _optional(r_raw, "hreflang_pair", str)
    if hreflang_pair and not hreflang_pair.startswith("/"):
        raise SpecError(f"route.hreflang_pair must start with '/' (got '{hreflang_pair}')")
    route = RouteEntry(
        changefreq=changefreq,
        priority=float(priority_raw),
        type=rtype,
        sitemap_group=sitemap_group,
        lang=lang,
        hreflang_pair=hreflang_pair,
    )

    whatsapp_message = _require(data, "whatsapp_message", str).strip()

    # verified_claims (optional)
    vc_raw = data.get("verified_claims", []) or []
    if not isinstance(vc_raw, list):
        raise SpecError("verified_claims must be a list (or omitted)")
    verified_claims: list[VerifiedClaim] = []
    for i, vc in enumerate(vc_raw):
        if not isinstance(vc, dict):
            raise SpecError(f"verified_claims[{i}] must be an object")
        text = _require(vc, "text", str, where=f"verified_claims[{i}]").strip()
        cite = _require(vc, "citation_source", str, where=f"verified_claims[{i}]").strip()
        if len(cite) < 10:
            raise SpecError(
                f"verified_claims[{i}].citation_source too vague; "
                f"describe the source concretely (document ref, URL, letter date)."
            )
        verified_claims.append(VerifiedClaim(text=text, citation_source=cite))

    return PageSpec(
        path=path,
        title=title,
        description=description,
        h1=h1,
        breadcrumb_label=breadcrumb_label,
        service_type=service_type,
        last_updated=last_updated,
        lede=lede,
        direct_answer=direct_answer,
        key_takeaways=key_takeaways,
        accepted_items=accepted_items,
        accepted_items_intro=accepted_items_intro,
        accepted_items_outro=accepted_items_outro,
        how_to_steps=how_to_steps,
        sections=sections,
        faqs=faqs,
        related_pages=related_pages,
        route=route,
        whatsapp_message=whatsapp_message,
        verified_claims=verified_claims,
    )


# ---------------------------------------------------------------------------
# Forbidden-phrase scan
# ---------------------------------------------------------------------------

def _iter_all_strings(spec: PageSpec) -> Iterable[tuple[str, str]]:
    """Yield (field_path, string_value) for every text field in the spec."""
    yield ("title", spec.title)
    yield ("description", spec.description)
    yield ("h1", spec.h1)
    yield ("lede", spec.lede)
    yield ("direct_answer", spec.direct_answer)
    yield ("whatsapp_message", spec.whatsapp_message)
    for i, kt in enumerate(spec.key_takeaways):
        yield (f"key_takeaways[{i}]", kt)
    for i, row in enumerate(spec.accepted_items.rows):
        for j, cell in enumerate(row):
            yield (f"accepted_items.rows[{i}][{j}]", cell)
    if spec.accepted_items_intro:
        yield ("accepted_items_intro", spec.accepted_items_intro)
    if spec.accepted_items_outro:
        yield ("accepted_items_outro", spec.accepted_items_outro)
    for i, step in enumerate(spec.how_to_steps):
        yield (f"how_to_steps[{i}].name", step.name)
        yield (f"how_to_steps[{i}].text", step.text)
    for i, s in enumerate(spec.sections):
        yield (f"sections[{i}].h2", s.h2)
        yield (f"sections[{i}].body", s.body)
    for i, f in enumerate(spec.faqs):
        yield (f"faqs[{i}].q", f.q)
        yield (f"faqs[{i}].a", f.a)


def scan_forbidden(spec: PageSpec) -> list[str]:
    """Return a list of violation strings. Empty list = clean spec."""
    violations: list[str] = []
    # Build allowlist from verified_claims texts (exact-substring whitelist).
    allow = [vc.text.lower() for vc in spec.verified_claims]

    for field_path, text in _iter_all_strings(spec):
        lowered = text.lower()
        # substring bans
        for phrase, rationale in FORBIDDEN_PHRASES:
            if phrase.lower() not in lowered:
                continue
            # allowed if the whole phrase is inside a verified_claims text
            if any(phrase.lower() in a for a in allow):
                continue
            violations.append(
                f"{field_path}: forbidden phrase '{phrase}'\n"
                f"    reason: {rationale}"
            )
        # regex bans
        for pat, rationale in FORBIDDEN_PATTERNS:
            for m in pat.finditer(text):
                match_str = m.group(0)
                if any(match_str.lower() in a for a in allow):
                    continue
                violations.append(
                    f"{field_path}: forbidden pattern match '{match_str}'\n"
                    f"    reason: {rationale}"
                )
    return violations


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------

def _js_string(s: str) -> str:
    """Escape a Python string for embedding as a JS/TS double-quoted string."""
    return '"' + (
        s.replace("\\", "\\\\")
         .replace('"', '\\"')
         .replace("\n", "\\n")
    ) + '"'


def _astro_multiline(s: str, indent: int = 6) -> str:
    """
    Emit a JS/TS template-literal or a plain multi-line string for use inside
    Astro frontmatter — used for the lede / body copy that renders as HTML
    (inside <p> tags). We keep it as a plain string with escaping.
    """
    return _js_string(s)


def _to_html_paragraphs(body: str) -> str:
    """
    Split body copy into <p> paragraphs on blank lines.
    Each paragraph is HTML-escaped (Astro renders `set:html` explicitly; we
    use plain expression interpolation elsewhere which is auto-escaped).
    """
    paras = [p.strip() for p in re.split(r"\n\s*\n", body) if p.strip()]
    if not paras:
        return "<p></p>"
    out_lines: list[str] = []
    for p in paras:
        collapsed = re.sub(r"\s+", " ", p)
        out_lines.append(f"    <p>{_html_escape(collapsed)}</p>")
    return "\n".join(out_lines)


def _html_escape(s: str) -> str:
    return (
        s.replace("&", "&amp;")
         .replace("<", "&lt;")
         .replace(">", "&gt;")
    )


def render_astro(spec: PageSpec) -> str:
    """Render the full Astro page as a single string."""

    # ---- Breadcrumb items ----
    breadcrumb_items_js = ",\n  ".join(
        [
            '{ name: "Home", path: "/" }',
            f'{{ name: {_js_string(spec.breadcrumb_label)}, path: {_js_string(spec.path)} }}',
        ]
    )

    # ---- howToSteps ----
    ht_lines = []
    for s in spec.how_to_steps:
        ht_lines.append(
            f'  {{ name: {_js_string(s.name)}, text: {_js_string(s.text)} }}'
        )
    ht_block = ",\n".join(ht_lines)

    # ---- acceptedTable ----
    at_col_keys = [
        re.sub(r"[^a-z0-9]+", "_", c.lower()).strip("_") or f"col{i}"
        for i, c in enumerate(spec.accepted_items.columns)
    ]
    at_rows_lines = []
    for row in spec.accepted_items.rows:
        pairs = ", ".join(
            f"{k}: {_js_string(v)}"
            for k, v in zip(at_col_keys, row)
        )
        at_rows_lines.append(f"  {{ {pairs} }}")
    at_rows_block = ",\n".join(at_rows_lines)

    # ---- FAQ items ----
    faq_lines = []
    for f in spec.faqs:
        faq_lines.append(
            f"  {{\n    q: {_js_string(f.q)},\n    a: {_js_string(f.a)},\n  }}"
        )
    faq_block = ",\n".join(faq_lines)

    # ---- JSON-LD payload ----
    site_url_lit = f"`{{SITE_URL}}{spec.path}`"  # we'll interpolate SITE_URL below

    # Build JSON-LD as a JS array literal, using ${SITE_URL} template strings.
    json_ld_service = f"""{{
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: {_js_string(spec.service_type)},
    provider: {{ "@id": `${{SITE_URL}}/#organization` }},
    areaServed: "Kochi, Ernakulam, Kerala",
    url: `${{SITE_URL}}{spec.path}`,
    description: {_js_string(spec.description)},
  }}"""

    json_ld_howto = f"""{{
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: {_js_string(f"How to {spec.h1.split(' in ')[0]} in Kochi" if ' in Kochi' in spec.h1 else f"How to {spec.h1}")},
    description: {_js_string(f"Step-by-step process for {spec.service_type.lower()} in Kochi.")},
    step: howToSteps.map((s) => ({{ "@type": "HowToStep", name: s.name, text: s.text }})),
  }}"""

    json_ld_webpage = f"""{{
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${{SITE_URL}}{spec.path}`,
    name: title,
    description,
    dateModified: lastUpdated,
    breadcrumb: {{
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((b, i) => ({{
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${{SITE_URL}}${{b.path}}`,
      }})),
    }},
  }}"""

    json_ld_block = ",\n  ".join([json_ld_service, json_ld_howto, json_ld_webpage])

    # ---- Related pages HTML ----
    related_html_lines = [
        f'      <li><a href="{rp.path}">{_html_escape(rp.label)}</a></li>'
        for rp in spec.related_pages
    ]
    related_html = "\n".join(related_html_lines)

    # ---- Key takeaways HTML ----
    kt_html_lines = [
        f"    <li>{_html_escape(kt)}</li>" for kt in spec.key_takeaways
    ]
    kt_html = "\n".join(kt_html_lines)

    # ---- Accepted items table (Astro template) ----
    at_thead = "".join(f"<th>{_html_escape(c)}</th>" for c in spec.accepted_items.columns)
    at_body_cells_template = "\n            ".join(
        f"<td>{{row.{k}}}</td>" for k in at_col_keys
    )

    # ---- Sections HTML ----
    sections_html_parts: list[str] = []
    for s in spec.sections:
        sections_html_parts.append(
            f"  <section>\n"
            f"    <h2>{_html_escape(s.h2)}</h2>\n"
            f"{_to_html_paragraphs(s.body)}\n"
            f"  </section>"
        )
    sections_html = "\n\n".join(sections_html_parts)

    # ---- Accepted items intro/outro paragraphs ----
    accepted_intro_html = ""
    if spec.accepted_items_intro:
        accepted_intro_html = f"    <p>{_html_escape(re.sub(chr(10) + r'\s+', ' ', spec.accepted_items_intro.strip()))}</p>\n"
    accepted_outro_html = ""
    if spec.accepted_items_outro:
        accepted_outro_html = f"\n    <p>{_html_escape(re.sub(chr(10) + r'\s+', ' ', spec.accepted_items_outro.strip()))}</p>"

    # ---- Verified-claims comment block ----
    vc_comment = ""
    if spec.verified_claims:
        lines = [
            "  ---",
            "  Verified claims used in this page (each has a documented source):",
        ]
        for vc in spec.verified_claims:
            lines.append(f"    - {vc.text}")
            lines.append(f"      source: {vc.citation_source}")
        lines.append("  ---")
        vc_comment = "\n" + "\n".join(f"  {line}" for line in lines) + "\n"

    # ---- Compose the final Astro file ----
    astro = f"""---
// Generated by scripts/generate-pillar-page.py on {spec.last_updated}.
// Source spec was validated against the anti-fabrication rules in
// scripts/generate-pillar-page.py (FORBIDDEN_PHRASES + FORBIDDEN_PATTERNS).
// Do not edit this file to add claims that would fail those rules —
// regenerate from an updated spec instead.{vc_comment}
import Layout from "{("../" * (spec.path.strip("/").count("/") + 2))}layouts/Layout.astro";
import Breadcrumbs from "{("../" * (spec.path.strip("/").count("/") + 2))}components/Breadcrumbs.astro";
import CtaBar from "{("../" * (spec.path.strip("/").count("/") + 2))}components/CtaBar.astro";
import Faq from "{("../" * (spec.path.strip("/").count("/") + 2))}components/Faq.astro";
import DirectAnswer from "{("../" * (spec.path.strip("/").count("/") + 2))}components/DirectAnswer.astro";
import {{ SITE_URL }} from "{("../" * (spec.path.strip("/").count("/") + 2))}data/site";
import {{ getHreflang }} from "{("../" * (spec.path.strip("/").count("/") + 2))}data/routes";

const title = {_js_string(spec.title)};
const description = {_js_string(spec.description)};
const lastUpdated = {_js_string(spec.last_updated)};

const breadcrumbItems = [
  {breadcrumb_items_js}
];

const howToSteps = [
{ht_block}
];

const acceptedTable = [
{at_rows_block}
];

const jsonLd = [
  {json_ld_block},
];

const faqItems = [
{faq_block}
];
---

<Layout title={{title}} description={{description}} path={_js_string(spec.path)} jsonLd={{jsonLd}} hreflang={{getHreflang({_js_string(spec.path)})}}>
  <Breadcrumbs items={{breadcrumbItems}} />
  <h1>{_html_escape(spec.h1)}</h1>
  <p class="lede">
    {_html_escape(re.sub(chr(10) + r'\s+', ' ', spec.lede.strip()))}
  </p>

  <DirectAnswer>
    <p>
      {_html_escape(re.sub(chr(10) + r'\s+', ' ', spec.direct_answer.strip()))}
    </p>
  </DirectAnswer>

  <CtaBar whatsappMessage={_js_string(spec.whatsapp_message)} />

  <ul class="key-takeaways">
{kt_html}
  </ul>

  <section>
    <h2>What we accept</h2>
{accepted_intro_html}    <table class="accepted-items-table">
      <thead>
        <tr>{at_thead}</tr>
      </thead>
      <tbody>
        {{acceptedTable.map((row) => (
          <tr>
            {at_body_cells_template}
          </tr>
        ))}}
      </tbody>
    </table>{accepted_outro_html}
  </section>

  <section>
    <h2>How the process works</h2>
    <ol class="how-to-list">
      {{howToSteps.map((s) => (
        <li><strong>{{s.name}}.</strong> {{s.text}}</li>
      ))}}
    </ol>
  </section>

{sections_html}

  <section id="faq">
    <h2>Frequently asked questions</h2>
    <Faq items={{faqItems}} />
  </section>

  <section>
    <h2>Related pages</h2>
    <ul>
{related_html}
    </ul>
  </section>

  <CtaBar whatsappMessage={_js_string(spec.whatsapp_message)} />
</Layout>
"""
    return astro


def rendered_word_count(spec: PageSpec) -> int:
    """Estimate the rendered word count so we can warn on shallow pages."""
    parts = [
        spec.h1,
        spec.lede,
        spec.direct_answer,
        " ".join(spec.key_takeaways),
        spec.accepted_items_intro or "",
        spec.accepted_items_outro or "",
        " ".join(cell for row in spec.accepted_items.rows for cell in row),
        " ".join(step.name + " " + step.text for step in spec.how_to_steps),
        " ".join(f"{s.h2} {s.body}" for s in spec.sections),
        " ".join(f"{f.q} {f.a}" for f in spec.faqs),
        " ".join(rp.label for rp in spec.related_pages),
    ]
    return len(" ".join(parts).split())


# ---------------------------------------------------------------------------
# routes.ts registration
# ---------------------------------------------------------------------------

ROUTES_END_MARKER = "];\n\nexport const BASE_ROUTES_LOOKUP"
ROUTES_ENTRY_TEMPLATE = """  {{
    path: "{path}",
    changefreq: "{changefreq}",
    priority: {priority},
    title: "{title}",
    description:
      "{description}",
    type: "{type}",
    sitemapGroup: "{sitemap_group}",
    lang: "{lang}",{hreflang_line}
  }},
"""


def register_route(routes_ts_path: Path, spec: PageSpec, dry_run: bool = False) -> str:
    """
    Append a route entry to BASE_ROUTES in routes.ts.

    Returns the new file contents (for dry-run inspection).
    Refuses to run if the path is already registered.
    """
    if not routes_ts_path.exists():
        raise SpecError(f"routes.ts not found at {routes_ts_path}")
    original = routes_ts_path.read_text(encoding="utf-8")

    # duplicate-path guard
    if f'path: "{spec.path}"' in original:
        raise SpecError(
            f"route for '{spec.path}' already exists in routes.ts. "
            f"Refusing to double-register."
        )

    # Locate the end of BASE_ROUTES array. Match the last `];` before
    # `export const BASE_ROUTES_LOOKUP` (or fall back to the final `];`).
    # The existing routes.ts uses a specific pattern; we search for a
    # reliable marker.
    marker_variants = [
        "];\n\nexport const BASE_ROUTES_LOOKUP",
        "];\nexport const BASE_ROUTES_LOOKUP",
    ]
    marker = None
    for m in marker_variants:
        if m in original:
            marker = m
            break

    # Fallback: find the LAST `];` that appears after a `path:` line — that
    # will be the closing bracket of the BASE_ROUTES array in normal cases.
    if marker is None:
        # Find the last `];` in the file; that's our closing bracket.
        idx = original.rfind("];")
        if idx == -1:
            raise SpecError(
                "could not locate BASE_ROUTES closing bracket in routes.ts. "
                "Manual insertion required."
            )
        insertion_point = idx
        marker_after = original[idx:]
    else:
        insertion_point = original.rfind(marker)
        marker_after = original[insertion_point:]

    hreflang_line = (
        f'\n    hreflangPair: "{spec.route.hreflang_pair}",'
        if spec.route.hreflang_pair
        else ""
    )
    entry = ROUTES_ENTRY_TEMPLATE.format(
        path=spec.path,
        changefreq=spec.route.changefreq,
        priority=spec.route.priority,
        title=spec.title.replace('"', '\\"'),
        description=spec.description.replace('"', '\\"'),
        type=spec.route.type,
        sitemap_group=spec.route.sitemap_group,
        lang=spec.route.lang,
        hreflang_line=hreflang_line,
    )

    # Insert entry BEFORE the marker.
    new_content = original[:insertion_point] + entry + marker_after
    if not dry_run:
        routes_ts_path.write_text(new_content, encoding="utf-8")
    return new_content


# ---------------------------------------------------------------------------
# Sample spec
# ---------------------------------------------------------------------------

SAMPLE_SPEC = """\
# Sample spec for scripts/generate-pillar-page.py
# Fill in the fields, save as spec.yaml, run:
#   python3 scripts/generate-pillar-page.py spec.yaml --dry-run

path: /appliance-recycling/
title: "Where to Recycle Appliances in Kochi | Free Pickup"
description: "Where to recycle old washing machines, fridges, ACs and kitchen appliances in Kochi — doorstep pickup, refrigerant handling, safe material recovery."
h1: "Where to Recycle Appliances in Kochi"
breadcrumb_label: "Appliance Recycling"
service_type: "Home appliance recycling"
last_updated: "2026-07-28"

lede: |
  Home appliances — washing machines, refrigerators, air conditioners, microwaves,
  water heaters — sit differently from small electronics. They're heavier, they
  often carry refrigerant or oil, and they're rarely worth resale after 8-10 years
  of use. This page covers what gets accepted, how transport is planned, and what
  happens to refrigerant-carrying units before the metal, plastic and copper are
  separated for recovery.

direct_answer: |
  To recycle a home appliance in Kochi, WhatsApp Ewaste Kochi with the appliance
  type, brand, approximate age, and your address. Pickup is scheduled based on
  the item, its condition (working or not) and transport requirements.
  Refrigerant-carrying units (fridges, ACs) go through a certified refrigerant
  handling step before material recovery. Doorstep pickup is free for eligible
  collections; scheduling and transport add-ons are quoted before the job.

key_takeaways:
  - "Washing machines, fridges, ACs, microwaves, water heaters — all accepted."
  - "Refrigerant-carrying units need certified handling before recycling."
  - "Bulk (multi-appliance) pickups are common during apartment moves."
  - "Working units may qualify for a condition-based buyback quote, checked on inspection."
  - "Pickup slot is confirmed after area, item and transport review."

accepted_items:
  columns: ["Appliance", "Route", "Notes"]
  rows:
    - ["Washing machines (any brand, any age)", "Material recovery; buyback for recent working units", "Photo of the model plate helps"]
    - ["Refrigerators", "Certified refrigerant handling + material recovery", "Do not attempt to remove gas yourself"]
    - ["Air conditioners (split + window)", "Certified refrigerant handling + material recovery", "Coordinate copper pipe removal with the technician"]
    - ["Microwaves", "Material recovery", "Include the turntable and rack"]
    - ["Water heaters (electric + gas)", "Material recovery; gas heaters may need advance transport plan", "Flag if the tank shows corrosion"]
    - ["Mixers, grinders, small kitchen appliances", "Material recovery", "Batch with other e-waste in one pickup"]

how_to_steps:
  - name: "Message the appliance details"
    text: "Type, brand, approximate age, and whether it still powers on. Photos of the model plate and the appliance in situ help transport planning."
  - name: "Flag refrigerant status"
    text: "Fridges and ACs contain refrigerant that must not be released into the atmosphere. The team plans certified handling before pickup — do not attempt DIY refrigerant removal."
  - name: "Confirm access and transport requirements"
    text: "Floor, lift access, stairs, and whether the appliance is inside or already moved to a common area. Bulky items sometimes need advance transport arrangement."
  - name: "Doorstep pickup at the confirmed slot"
    text: "The team arrives with the right equipment, disconnects the appliance where needed, and collects it. Pickup acknowledgement paperwork is signed on the spot."
  - name: "Downstream processing"
    text: "Refrigerant is recovered separately; metal, plastic and copper are separated for material recovery. Working units with resale demand may route to marketplace after inspection."

sections:
  - h2: "Refrigerant handling — why fridges and ACs are different"
    body: |
      Refrigerators and air conditioners contain refrigerant gas (typically R-134a, R-410A,
      R-22 or R-32 depending on age and type). Under Indian environmental rules, this
      refrigerant must not be released into the atmosphere during recycling. The
      practical implication for you: do not attempt DIY refrigerant removal, do not
      let untrained scrap collectors take these units, and expect a certified handling
      step to be scheduled between pickup and material recovery.

      The team's default workflow: pickup at your location, transport to a facility
      equipped for refrigerant recovery, gas recovery under closed-loop equipment,
      then the shell of the unit routes to standard material recovery. This is why
      fridge and AC pickup is treated as a scheduled job rather than a same-day
      route — the downstream handling has to be lined up.

  - h2: "Buyback vs recycling for appliances"
    body: |
      For most appliances more than 5-7 years old, resale demand is limited, and the
      route is straight to material recovery — with no payment received, though
      pickup remains free. For recent, working appliances (last 2-3 years, common
      brand, no visible damage) a condition-based buyback quote is possible. Send
      photos of the model plate, the front, and any visible damage, and the team
      gives a condition-based estimate. Final quote is confirmed at inspection.

      Two common cases where buyback surprises people: (a) working refrigerators
      under 3 years old, especially inverter models, and (b) split-AC outdoor
      units in working condition even when the indoor unit is being replaced.
      Both can carry meaningful resale value in the second-hand market.

  - h2: "Bulk appliance pickup — apartment moves and property cleanouts"
    body: |
      A single old washing machine is a routine pickup. A full apartment cleanout —
      fridge, washing machine, AC, microwave, water heater, all going at once — is a
      different scheduling problem. Bulk appliance pickups need advance planning
      because the transport vehicle, the refrigerant handling slot, and the item
      manifest all have to be coordinated. Give 3-5 working days notice for a full
      cleanout, longer if the address is outside the Ernakulam district core.

      For rental property handovers (landlord clearing an apartment between
      tenants), the pickup can be paired with a signed handover manifest for
      documentation purposes.

faqs:
  - q: "Where can I recycle an old washing machine in Kochi?"
    a: "Message Ewaste Kochi with the brand, age and address. Pickup is scheduled based on area and current transport route. Working machines under 5 years old may qualify for a condition-based buyback quote; older ones go to material recovery, with pickup free either way."

  - q: "How does refrigerator recycling work with the refrigerant?"
    a: "The fridge is picked up intact and routed to a facility equipped for refrigerant recovery. The gas is captured under closed-loop equipment before the shell of the unit enters material recovery. Do not attempt DIY refrigerant removal — it's environmentally regulated and technically risky."

  - q: "Can I recycle an air conditioner during monsoon?"
    a: "Yes. Wet-season pickup is fine for indoor collection; if the outdoor unit needs to be removed from a wall or balcony, the team confirms whether the site condition allows safe dismantling on the day. Reschedule is free if weather forces it."

  - q: "Do you accept damaged or broken appliances?"
    a: "Yes. A washing machine that won't spin, a fridge that stopped cooling, a microwave with a broken door — all accepted for pickup and material recovery. Note the damage in your message so the team knows what to expect on site."

  - q: "How much notice do I need for an appliance pickup?"
    a: "For a single appliance, 1-2 working days is usually enough. For a full apartment cleanout (fridge + washing machine + AC + more), plan 3-5 working days so the transport and refrigerant handling can be scheduled properly."

  - q: "Do I need to be present at pickup?"
    a: "Someone authorized — you, a family member, a property manager — should be present so the appliance list can be verified against what was quoted and the pickup acknowledgement can be signed."

  - q: "Is there a charge for bulky-item transport?"
    a: "Doorstep pickup is free for eligible collections. Some scenarios — very high floors without lift access, remote locations, urgent same-day requests — may need a transport-cost quote confirmed before the job. Quoted before, never after."

related_pages:
  - path: /recycling/
    label: "General e-waste recycling — parent pillar"
  - path: /battery-recycling/
    label: "Battery recycling — for standalone inverter or UPS batteries"
  - path: /pickup/
    label: "Pickup — how doorstep scheduling works"
  - path: /locations/
    label: "Locations served"
  - path: /tools/scrap-value-calculator/
    label: "Scrap value calculator"

route:
  changefreq: monthly
  priority: 0.9
  type: service
  sitemap_group: services
  lang: en-IN
  hreflang_pair: null  # set to /ml/appliance-recycling/ once Malayalam version exists

whatsapp_message: "Hi, I'd like to recycle a home appliance — here are the details:"

# Optional: whitelist specific claims that would otherwise trip the forbidden-phrase
# scan. Each entry MUST have a citation_source. Only use for facts you can actually
# verify against a document.
#
# verified_claims:
#   - text: "KSPCB registration KL/EW/628"
#     citation_source: "internal document REG-2024-11, KSPCB acknowledgement letter dated 2024-05-10"
"""


# ---------------------------------------------------------------------------
# Main CLI
# ---------------------------------------------------------------------------

def find_project_root(start: Path) -> Path:
    """
    Walk up looking for package.json + astro.config.mjs.

    Search order:
      1. Walk up from `start` (usually the spec file's directory).
      2. Walk up from CWD.
      3. Walk up from this script's own directory.

    This means: putting a spec in /tmp/, running the script from the project
    root — or running it from anywhere with the script installed inside the
    project — both work.
    """
    from itertools import chain

    def walk_up(p: Path) -> Optional[Path]:
        p = p.resolve()
        for candidate in [p, *p.parents]:
            if (candidate / "package.json").exists() and (candidate / "astro.config.mjs").exists():
                return candidate
        return None

    for origin in [start, Path.cwd(), Path(__file__).parent]:
        found = walk_up(origin)
        if found is not None:
            return found

    raise SpecError(
        "could not find project root (expected package.json + astro.config.mjs) "
        "walking up from the spec file, CWD, or this script's location. "
        "Pass --project-root explicitly to override."
    )


def main() -> int:
    parser = argparse.ArgumentParser(
        formatter_class=argparse.RawDescriptionHelpFormatter,
        description=(
            "Spec-driven Astro pillar-page generator for ewastekochi-v2. "
            "See the file docstring for full usage."
        ),
    )
    parser.add_argument("spec", nargs="?", help="Path to .yaml/.yml/.json spec file")
    parser.add_argument(
        "--emit-sample-spec",
        action="store_true",
        help="Print a fully-fleshed sample spec to stdout and exit.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Validate + render + print to stdout, do NOT write any files.",
    )
    parser.add_argument(
        "--validate-only",
        action="store_true",
        help="Validate the spec only. Do NOT render or write.",
    )
    parser.add_argument(
        "--live",
        action="store_true",
        help=(
            "Write to src/pages/<path>/index.astro instead of the safe default "
            "quarantine location. Use only after reviewing a quarantined draft."
        ),
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite an existing file at the target path.",
    )
    parser.add_argument(
        "--register-route",
        action="store_true",
        help="Append a route entry to src/data/routes.ts. Requires --live.",
    )
    parser.add_argument(
        "--project-root",
        help="Override auto-detection of the project root.",
    )
    args = parser.parse_args()

    # --emit-sample-spec: dump and exit.
    if args.emit_sample_spec:
        sys.stdout.write(SAMPLE_SPEC)
        return 0

    if not args.spec:
        parser.error("spec file argument required (or use --emit-sample-spec)")

    spec_path = Path(args.spec)

    # ---- Load + validate ----
    try:
        raw = load_spec(spec_path)
        spec = parse_spec(raw)
    except SpecError as e:
        print(f"✗ spec validation failed: {e}", file=sys.stderr)
        return 2

    # ---- Forbidden-phrase scan ----
    violations = scan_forbidden(spec)
    if violations:
        print(f"✗ {len(violations)} forbidden-phrase / pattern violation(s):", file=sys.stderr)
        for v in violations:
            print(f"  - {v}", file=sys.stderr)
        print(
            "\nTo whitelist a specific claim, add it to `verified_claims:` in the spec "
            "with a citation_source. See --emit-sample-spec.",
            file=sys.stderr,
        )
        return 3

    # ---- Rendered word-count check ----
    word_count = rendered_word_count(spec)

    # ---- Validate-only exit ----
    if args.validate_only:
        print("✓ spec valid; no forbidden phrases; estimated rendered word count:", word_count)
        if word_count < WORD_COUNT_SOFT_MIN:
            print(
                f"  (word count {word_count} is below soft-minimum {WORD_COUNT_SOFT_MIN}; "
                f"consider expanding sections and FAQs)"
            )
        return 0

    # ---- Render ----
    astro = render_astro(spec)

    if word_count < WORD_COUNT_HARD_MIN:
        print(f"✗ rendered word count too low ({word_count} < {WORD_COUNT_HARD_MIN})", file=sys.stderr)
        return 2

    # ---- Dry-run: print to stdout ----
    if args.dry_run:
        sys.stdout.write(astro)
        print(
            f"\n// [dry-run] estimated rendered word count: {word_count}",
            file=sys.stderr,
        )
        if word_count < WORD_COUNT_SOFT_MIN:
            print(
                f"// [dry-run] warning: below soft minimum {WORD_COUNT_SOFT_MIN}",
                file=sys.stderr,
            )
        return 0

    # ---- Determine output path ----
    try:
        project_root = Path(args.project_root) if args.project_root else find_project_root(spec_path.parent)
    except SpecError as e:
        print(f"✗ {e}", file=sys.stderr)
        return 2

    if args.live:
        out_dir = project_root / LIVE_PAGES_ROOT_REL / spec.path.strip("/")
    else:
        out_dir = project_root / QUARANTINE_ROOT_REL / spec.path.strip("/")

    out_file = out_dir / "index.astro"

    if out_file.exists() and not args.force:
        print(f"✗ file exists: {out_file}", file=sys.stderr)
        print(f"  pass --force to overwrite, or delete/rename the existing file first.", file=sys.stderr)
        return 4

    # ---- Write the page ----
    try:
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file.write_text(astro, encoding="utf-8")
    except OSError as e:
        print(f"✗ file write failed: {e}", file=sys.stderr)
        return 6

    print(f"✓ wrote {out_file}")
    print(f"  estimated rendered word count: {word_count}")

    if word_count < WORD_COUNT_SOFT_MIN:
        print(
            f"  ⚠ below soft minimum {WORD_COUNT_SOFT_MIN}; "
            f"consider expanding sections and FAQs before promoting."
        )
    elif word_count > WORD_COUNT_SOFT_MAX:
        print(
            f"  ⚠ above soft maximum {WORD_COUNT_SOFT_MAX}; "
            f"long pages are fine but consider whether it should split into two."
        )

    # ---- Register route (optional) ----
    if args.register_route:
        if not args.live:
            print(
                "✗ --register-route requires --live "
                "(don't register a quarantined draft as a live route)",
                file=sys.stderr,
            )
            return 1
        routes_ts = project_root / ROUTES_TS_REL
        try:
            register_route(routes_ts, spec, dry_run=False)
            print(f"✓ appended route entry to {routes_ts}")
        except SpecError as e:
            print(f"✗ route registration failed: {e}", file=sys.stderr)
            return 5

    # ---- Post-actions summary ----
    print("")
    print("Next steps:")
    if not args.live:
        print(f"  1. Review: {out_file}")
        print(f"  2. If good, re-run with --live [--register-route] to promote.")
    else:
        print(f"  1. Run: npm run build   (check the page compiles + sitemap picks it up)")
        if not args.register_route:
            print(f"  2. Register the route: re-run with --register-route (or add it to routes.ts manually)")
        else:
            print(f"  2. Verify: curl -sI {SITE_URL}{spec.path}  → expect 200 after deploy")
    return 0


if __name__ == "__main__":
    sys.exit(main())

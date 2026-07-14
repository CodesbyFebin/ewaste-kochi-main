#!/usr/bin/env python3
"""
Generates one branded 1200x630 title-card image per blog post title in
scripts/data/blog-roadmap-600.json, saved to images/blog/{slug}.png.

No AI image-generation API is used here (none is available in this
environment, and no AI prompt template was ever actually provided in the
conversation this script was requested from). Instead this implements a
programmatic equivalent of a "prompt template with object suggestions":
IMAGE_PROMPT_TEMPLATE below documents the composition rules an AI prompt
would encode (subject, palette, mood, composition), and OBJECT_SUGGESTIONS
maps keywords found in each title to a concrete visual motif drawn with
Pillow. Swap generate_image() for a real API call later without touching
the keyword-matching or file-naming logic.

Usage:
    python3 scripts/generate_blog_images.py
    python3 scripts/generate_blog_images.py --limit 5   # smoke test
    python3 scripts/generate_blog_images.py --slug where-to-recycle-old-electronics-in-kochi
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
from pathlib import Path
from typing import NamedTuple

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "scripts" / "data" / "blog-roadmap-600.json"
OUTPUT_DIR = ROOT / "images" / "blog"

CANVAS_W, CANVAS_H = 1200, 630

# ── "Prompt template" (documented composition rules, applied programmatically) ──
IMAGE_PROMPT_TEMPLATE = (
    "Flat, minimal editorial illustration for an e-waste recycling blog post. "
    "Subject: {object_label}, rendered as a simple geometric silhouette. "
    "Palette: brand green ({accent_hex}) on a dark gradient background, "
    "consistent with the Ewaste Kochi site identity. Composition: subject "
    "motif in the right two-thirds, post title as bold left-aligned text, "
    "small cluster-name eyebrow label above the title. Mood: clean, "
    "trustworthy, non-stocky. No people, no fake logos, no invented brands."
)

# Brand palette (matches src/styles/*.css --color-primary family already used
# site-wide; kept deliberately small and consistent rather than random).
BG_DARK = (13, 26, 21)
BG_DARK_2 = (9, 18, 15)
ACCENT_GREEN = (52, 199, 123)
ACCENT_GREEN_DIM = (30, 110, 71)
TEXT_WHITE = (240, 247, 244)
TEXT_MUTED = (163, 186, 176)

Point = tuple[int, int]


class Motif(NamedTuple):
    label: str
    draw: str  # dispatch key used by draw_motif()


# Keyword -> visual object suggestion. Order matters: first match wins, so
# more specific keywords are listed before generic ones.
OBJECT_SUGGESTIONS: list[tuple[re.Pattern[str], Motif]] = [
    (re.compile(r"battery|batteries|ups|inverter|power bank", re.I), Motif("a battery cell", "battery")),
    (re.compile(r"laptop|notebook", re.I), Motif("an open laptop", "laptop")),
    (re.compile(r"desktop|computer|pc\b", re.I), Motif("a desktop tower", "desktop")),
    (re.compile(r"phone|mobile|smartphone", re.I), Motif("a smartphone", "phone")),
    (re.compile(r"tv|television|monitor|screen|display", re.I), Motif("a monitor/TV frame", "monitor")),
    (re.compile(r"printer|scanner|copier|cartridge|toner", re.I), Motif("a printer", "printer")),
    (re.compile(r"server|network|switch|router|modem|data ?center", re.I), Motif("a server rack", "server")),
    (re.compile(r"solar|inverter|panel", re.I), Motif("a solar panel", "solar")),
    (re.compile(r"cctv|camera|security|smart device|sensor|doorbell", re.I), Motif("a camera lens", "camera")),
    (re.compile(r"cable|wire|charger|adapter|cord", re.I), Motif("a coiled cable", "cable")),
    (re.compile(r"recycl|sustainab|environment", re.I), Motif("a recycling loop", "recycle")),
    (re.compile(r"compliance|rule|law|epr|policy", re.I), Motif("a document/checklist", "document")),
    (re.compile(r"price|value|sell|scrap|quote|money", re.I), Motif("an upward value arrow", "value")),
    (re.compile(r"pickup|collect|drive|community|school|apartment", re.I), Motif("a pickup route pin", "pin")),
]

DEFAULT_MOTIF = Motif("an e-waste bin", "bin")


def pick_motif(title: str) -> Motif:
    for pattern, motif in OBJECT_SUGGESTIONS:
        if pattern.search(title):
            return motif
    return DEFAULT_MOTIF


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = (
        [
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
        if bold
        else [
            "/System/Library/Fonts/Supplemental/Arial.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
    )
    for path in candidates:
        if Path(path).exists():
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default(size=size)


def deterministic_seed(slug: str) -> int:
    return int(hashlib.sha256(slug.encode("utf-8")).hexdigest()[:8], 16)


def draw_gradient_background(img: Image.Image, seed: int) -> None:
    draw = ImageDraw.Draw(img)
    for y in range(CANVAS_H):
        t = y / CANVAS_H
        r = round(BG_DARK[0] + (BG_DARK_2[0] - BG_DARK[0]) * t)
        g = round(BG_DARK[1] + (BG_DARK_2[1] - BG_DARK[1]) * t)
        b = round(BG_DARK[2] + (BG_DARK_2[2] - BG_DARK[2]) * t)
        draw.line([(0, y), (CANVAS_W, y)], fill=(r, g, b))
    # Faint seeded accent arc, purely decorative, keeps images non-identical.
    rng_x = 700 + (seed % 400)
    rng_r = 260 + (seed % 140)
    draw.ellipse(
        [rng_x - rng_r, -rng_r + 80, rng_x + rng_r, rng_r + 80],
        outline=ACCENT_GREEN_DIM,
        width=2,
    )


def draw_motif(draw: ImageDraw.ImageDraw, motif: Motif, cx: int, cy: int, scale: float) -> None:
    s = scale
    color = ACCENT_GREEN

    def rect(x0: float, y0: float, x1: float, y1: float, **kw: object) -> None:
        draw.rectangle([cx + x0 * s, cy + y0 * s, cx + x1 * s, cy + y1 * s], **kw)  # type: ignore[arg-type]

    def ellipse(x0: float, y0: float, x1: float, y1: float, **kw: object) -> None:
        draw.ellipse([cx + x0 * s, cy + y0 * s, cx + x1 * s, cy + y1 * s], **kw)  # type: ignore[arg-type]

    if motif.draw == "battery":
        rect(-60, -100, 60, 100, outline=color, width=6)
        rect(-20, -120, 20, -100, fill=color)
        rect(-40, -60, 40, 60, fill=ACCENT_GREEN_DIM)
    elif motif.draw == "laptop":
        rect(-110, -70, 110, 40, outline=color, width=6)
        rect(-130, 40, 130, 60, fill=color)
    elif motif.draw == "desktop":
        rect(-70, -110, 70, 90, outline=color, width=6)
        rect(-90, 100, 90, 115, fill=color)
    elif motif.draw == "phone":
        draw.rounded_rectangle(
            [cx - 45 * s, cy - 110 * s, cx + 45 * s, cy + 110 * s],
            radius=18 * s,
            outline=color,
            width=6,
        )
        ellipse(-6, 85, 6, 97, fill=color)
    elif motif.draw == "monitor":
        rect(-120, -85, 120, 65, outline=color, width=6)
        rect(-30, 65, 30, 90, fill=color)
        rect(-60, 90, 60, 102, fill=color)
    elif motif.draw == "printer":
        rect(-100, -20, 100, 60, outline=color, width=6)
        rect(-70, -60, 70, -20, fill=ACCENT_GREEN_DIM)
        rect(-80, 60, 80, 80, fill=color)
    elif motif.draw == "server":
        for i, y in enumerate((-90, -30, 30)):
            rect(-90, y, 90, y + 45, outline=color, width=5)
            ellipse(60, y + 15, 74, y + 29, fill=color)
    elif motif.draw == "solar":
        rect(-110, -70, 110, 70, outline=color, width=6)
        draw.line([cx - 110 * s, cy, cx + 110 * s, cy], fill=color, width=4)
        draw.line([cx - 36 * s, cy - 70 * s, cx - 36 * s, cy + 70 * s], fill=color, width=4)
        draw.line([cx + 36 * s, cy - 70 * s, cx + 36 * s, cy + 70 * s], fill=color, width=4)
    elif motif.draw == "camera":
        ellipse(-90, -60, 90, 60, outline=color, width=6)
        ellipse(-40, -40, 40, 40, outline=color, width=6)
        ellipse(-12, -12, 12, 12, fill=color)
    elif motif.draw == "cable":
        draw.arc([cx - 100 * s, cy - 100 * s, cx + 100 * s, cy + 100 * s], 200, 340, fill=color, width=8)
        draw.arc([cx - 60 * s, cy - 40 * s, cx + 140 * s, cy + 160 * s], 20, 160, fill=color, width=8)
    elif motif.draw == "recycle":
        for angle in (0, 120, 240):
            a = math.radians(angle)
            ax, ay = 70 * math.cos(a), 70 * math.sin(a)
            draw.arc(
                [cx + ax - 55 * s, cy + ay - 55 * s, cx + ax + 55 * s, cy + ay + 55 * s],
                angle + 20,
                angle + 160,
                fill=color,
                width=7,
            )
    elif motif.draw == "document":
        rect(-80, -110, 80, 110, outline=color, width=6)
        for y in (-70, -40, -10, 20, 50):
            draw.line([cx - 55 * s, cy + y * s, cx + 55 * s, cy + y * s], fill=ACCENT_GREEN_DIM, width=4)
    elif motif.draw == "value":
        draw.polygon(
            [
                (cx - 90 * s, cy + 90 * s),
                (cx - 30 * s, cy + 20 * s),
                (cx + 10 * s, cy + 55 * s),
                (cx + 100 * s, cy - 90 * s),
            ],
            outline=color,
            width=8,
        )
        draw.polygon(
            [
                (cx + 60 * s, cy - 90 * s),
                (cx + 100 * s, cy - 90 * s),
                (cx + 100 * s, cy - 50 * s),
            ],
            fill=color,
        )
    elif motif.draw == "pin":
        ellipse(-55, -110, 55, 0, outline=color, width=7)
        draw.polygon(
            [(cx - 40 * s, cy - 10 * s), (cx + 40 * s, cy - 10 * s), (cx, cy + 90 * s)],
            outline=color,
            width=7,
        )
        ellipse(-18, -78, 18, -42, fill=color)
    else:  # bin (default)
        rect(-80, -60, 80, 110, outline=color, width=6)
        rect(-95, -80, 95, -60, fill=color)
        rect(-25, -110, 25, -80, fill=color)


def wrap_text(text: str, font: ImageFont.FreeTypeFont, max_width: int, draw: ImageDraw.ImageDraw) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), candidate, font=font)
        if bbox[2] - bbox[0] <= max_width or not current:
            current = candidate
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def generate_image(title: str, cluster_name: str, slug: str) -> Image.Image:
    """Renders one branded title-card PNG. This is the function to swap out
    for a real AI image API call later (see module docstring)."""
    motif = pick_motif(title)
    seed = deterministic_seed(slug)

    img = Image.new("RGB", (CANVAS_W, CANVAS_H), BG_DARK)
    draw_gradient_background(img, seed)
    draw = ImageDraw.Draw(img)

    # Motif on the right third.
    draw_motif(draw, motif, cx=920, cy=315, scale=1.0)

    # Eyebrow (cluster name).
    eyebrow_font = load_font(24, bold=True)
    draw.text((72, 90), cluster_name.upper(), font=eyebrow_font, fill=ACCENT_GREEN)

    # Title, wrapped, left-aligned, up to 4 lines.
    title_font = load_font(52, bold=True)
    lines = wrap_text(title, title_font, max_width=760, draw=draw)[:4]
    y = 150
    for line in lines:
        draw.text((72, y), line, font=title_font, fill=TEXT_WHITE)
        y += 66

    # Footer brand line.
    footer_font = load_font(22)
    draw.text((72, CANVAS_H - 70), "Ewaste Kochi — E-Waste Recycling Guides", font=footer_font, fill=TEXT_MUTED)

    return img


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--limit", type=int, default=None, help="Only generate the first N images (smoke test).")
    parser.add_argument("--slug", type=str, default=None, help="Only generate the image for this one slug.")
    args = parser.parse_args()

    if not DATA_FILE.exists():
        raise SystemExit(
            f"Missing {DATA_FILE}. Run `npx tsx scripts/export-blog-roadmap.ts` first."
        )

    rows = json.loads(DATA_FILE.read_text())
    if args.slug:
        rows = [r for r in rows if r["slug"] == args.slug]
        if not rows:
            raise SystemExit(f"No topic found with slug '{args.slug}'.")
    elif args.limit:
        rows = rows[: args.limit]

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    for i, row in enumerate(rows, start=1):
        img = generate_image(row["title"], row["clusterName"], row["slug"])
        out_path = OUTPUT_DIR / f"{row['slug']}.png"
        img.save(out_path, "PNG")
        print(f"[{i}/{len(rows)}] {out_path.relative_to(ROOT)}")

    print(f"\nDone. {len(rows)} image(s) written to {OUTPUT_DIR.relative_to(ROOT)}/")


if __name__ == "__main__":
    main()

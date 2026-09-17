#!/usr/bin/env python3
"""
indexnow-ping.py
================

Notifies IndexNow-participating search engines (Bing, Yandex, Seznam, Naver,
DuckDuckGo, Yep, and via IndexNow forwarding also feeds Google Discover / GSC
crawl scheduling) that specific URLs have been created or changed.

The IndexNow key file lives at public/<key>.txt (published as
https://www.ewastekochi.com/<key>.txt). This script reads the key from
.indexnow-key (kept in repo, cheap public token — not a secret) and posts
the URL list to https://api.indexnow.org/indexnow.

Usage:
    # Ping every URL from the built sitemap
    python3 scripts/indexnow-ping.py --from-sitemap

    # Ping specific URLs
    python3 scripts/indexnow-ping.py https://www.ewastekochi.com/new-page/ \
                                     https://www.ewastekochi.com/other/

    # Ping only the 59 new pages from this batch (recorded in a file)
    python3 scripts/indexnow-ping.py --from-file scripts/indexnow-batch.txt

IndexNow accepts up to 10,000 URLs per POST. We chunk if needed.
"""

from __future__ import annotations
import argparse
import json
import pathlib
import re
import sys
import time
import urllib.request

HOST = "www.ewastekochi.com"
SITE_URL = f"https://{HOST}"
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"
KEY_FILE = pathlib.Path(__file__).resolve().parent.parent / ".indexnow-key"
BATCH_SIZE = 5000  # well under IndexNow's 10k limit


def load_key() -> str:
    if not KEY_FILE.exists():
        raise SystemExit(f"✗ IndexNow key file missing at {KEY_FILE}")
    key = KEY_FILE.read_text().strip()
    if len(key) < 8 or not re.match(r"^[0-9a-f]+$", key):
        raise SystemExit(f"✗ IndexNow key looks malformed: {key!r}")
    return key


def urls_from_sitemap() -> list[str]:
    """Fetch the live sitemap-index + sub-sitemaps; extract every <loc>."""
    urls: list[str] = []
    for sitemap_path in ["/sitemap.xml", "/sitemap-index.xml", "/sitemap-0.xml"]:
        try:
            with urllib.request.urlopen(f"{SITE_URL}{sitemap_path}", timeout=15) as r:
                body = r.read().decode("utf-8", errors="replace")
        except Exception:
            continue
        # If this is an index, recurse into sub-sitemaps
        subs = re.findall(r"<loc>([^<]+\.xml)</loc>", body)
        for sub in subs:
            try:
                with urllib.request.urlopen(sub, timeout=15) as r:
                    sbody = r.read().decode("utf-8", errors="replace")
                urls.extend(re.findall(r"<loc>([^<]+)</loc>", sbody))
            except Exception:
                pass
        # Also collect any non-sitemap <loc> entries at this level
        for u in re.findall(r"<loc>([^<]+)</loc>", body):
            if not u.endswith(".xml"):
                urls.append(u)
    return sorted(set(urls))


def urls_from_file(path: pathlib.Path) -> list[str]:
    return [
        line.strip() for line in path.read_text().splitlines()
        if line.strip() and not line.strip().startswith("#")
    ]


def submit(key: str, urls: list[str], dry_run: bool = False) -> None:
    if not urls:
        print("(no URLs to submit)")
        return
    # Filter to our host only — IndexNow rejects mixed-host submissions
    urls = [u for u in urls if HOST in u]
    print(f"Submitting {len(urls)} URL(s) to IndexNow (host: {HOST})")
    for i in range(0, len(urls), BATCH_SIZE):
        chunk = urls[i:i + BATCH_SIZE]
        payload = {
            "host": HOST,
            "key": key,
            "keyLocation": f"{SITE_URL}/{key}.txt",
            "urlList": chunk,
        }
        if dry_run:
            print(f"  [dry-run] would POST {len(chunk)} URLs")
            print(f"    sample: {chunk[:3]}")
            continue
        body = json.dumps(payload).encode("utf-8")
        req = urllib.request.Request(
            INDEXNOW_ENDPOINT,
            data=body,
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST",
        )
        # Retry with exponential backoff for rate limits / transient errors
        max_retries = 5
        base_delay = 10
        for attempt in range(1, max_retries + 1):
            try:
                with urllib.request.urlopen(req, timeout=30) as r:
                    print(f"  chunk {i//BATCH_SIZE + 1}: HTTP {r.status} ({len(chunk)} URLs)")
                    break
            except urllib.error.HTTPError as e:
                if e.code == 429 and attempt < max_retries:
                    delay = base_delay * (2 ** (attempt - 1))
                    print(f"  chunk {i//BATCH_SIZE + 1}: HTTP 429 — retrying in {delay}s (attempt {attempt}/{max_retries})")
                    time.sleep(delay)
                    continue
                print(f"  chunk {i//BATCH_SIZE + 1}: HTTP {e.code} — {e.reason}")
                if e.code == 403:
                    print("    (403 = key file not found at keyLocation — deploy first)")
                elif e.code == 422:
                    print("    (422 = URL rejected; check host matches)")
                break
            except Exception as e:
                if attempt < max_retries:
                    delay = base_delay * (2 ** (attempt - 1))
                    print(f"  chunk {i//BATCH_SIZE + 1}: ERROR {e} — retrying in {delay}s (attempt {attempt}/{max_retries})")
                    time.sleep(delay)
                    continue
                print(f"  chunk {i//BATCH_SIZE + 1}: ERROR {e}")
                break


def main():
    parser = argparse.ArgumentParser(description="IndexNow ping utility.")
    src = parser.add_mutually_exclusive_group()
    src.add_argument("--from-sitemap", action="store_true",
                     help="Pull all URLs from the live sitemap")
    src.add_argument("--from-file",
                     help="Read URLs from a text file (one per line)")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("urls", nargs="*",
                        help="Explicit URLs to submit (mutually exclusive with source flags)")
    args = parser.parse_args()

    key = load_key()

    if args.from_sitemap:
        urls = urls_from_sitemap()
    elif args.from_file:
        urls = urls_from_file(pathlib.Path(args.from_file))
    elif args.urls:
        urls = args.urls
    else:
        parser.print_help()
        return 1

    submit(key, urls, dry_run=args.dry_run)
    return 0


if __name__ == "__main__":
    sys.exit(main())

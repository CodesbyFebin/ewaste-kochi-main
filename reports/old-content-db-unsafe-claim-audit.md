# OLD-P0B content.db Unsafe Claim Audit

Target requested: `astro-site/src/data/content.db`.

## Result

No SQLite database exists in this checkout.

Checked patterns:

- `content.db`
- `*.db`
- `*.sqlite`
- `*.sqlite3`

Files found: none.

## Tables, Columns, Row Counts

Not applicable. There is no database file to inspect with `sqlite3` or a safe script.

## Sample Rows

Not applicable. No rows exist in this checkout.

## Unsafe Claim Findings

No unsafe claims were found in a database because the database is absent.

Unsafe claims that did exist were in Astro/source files and content-bank data, not SQLite:

- Removed forbidden/overbroad schema source blocks.
- Removed direct Pollution Control Board authorization wording.
- Removed generated "authorized recycler like Ewaste Kochi" wording.

## Backup Status

DB backup path: not applicable. No `content.db` was present and no database mutation was attempted.

DB rows patched: 0.

If a future checkout includes `astro-site/src/data/content.db`, inspect and back it up before mutation.

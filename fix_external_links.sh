#!/bin/bash
# Script to add rel="noreferrer noopener" to external links in .astro files
# that point to http/https URLs and do not already have a rel attribute.

set -euo pipefail

echo "Starting to fix external links in .astro files..."

# Find all .astro files
find . -type f -name "*.astro" | while read -r file; do
    echo "Processing $file"
    # Use perl to add rel attribute to <a> tags with http/https href missing rel
    perl -i -pe '
        # Match <a> tags with href starting with http:// or https://
        # and that do NOT already contain rel=
        if (m{<a\b[^>]*href\s*=\s*["'"'"']https?://[^"'"'"]*["'"'"][^>]*>}i 
            && !m{rel\s*=}i) {
            # Insert rel="noreferrer noopener" before the closing >
            s{ (<a\b[^>]*href\s*=\s*["'"'"']https?://[^"'"'"]*["'"'"][^>]*) (>)
              }{$1 rel="noreferrer noopener"$2}ix;
        }
    ' "$file"
done

echo "Finished processing files."
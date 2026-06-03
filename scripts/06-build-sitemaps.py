#!/usr/bin/env python3
import os
import sqlite3
import math

def build_sitemaps():
    print("Generating sitemap index and chunked sitemaps for 11K pages from SQLite...")
    
    db_path = os.path.join(os.path.dirname(__file__), '..', 'astro-site', 'src', 'data', 'content.db')
    if not os.path.exists(db_path):
        print(f"Error: Database not found at {db_path}")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute('SELECT pillar, category, slug FROM blogs')
    # Exclude slugs ending in '-404' — counter collision with HTTP 404, confuses GSC
    rows = [(p, c, s) for p, c, s in cursor.fetchall() if not s.endswith('-404')]
    conn.close()

    total_urls = len(rows)
    urls_per_sitemap = 1000
    num_sitemaps = math.ceil(total_urls / urls_per_sitemap) if total_urls > 0 else 1
    
    public_dir = os.path.join(os.path.dirname(__file__), '..', 'astro-site', 'public')
    os.makedirs(public_dir, exist_ok=True)
    
    base_url = "https://www.ewastekochi.com"

    # Generate sitemap index content (written to both naming variants for compatibility)
    index_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    index_content += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for i in range(1, num_sitemaps + 1):
        index_content += f'  <sitemap>\n    <loc>{base_url}/sitemap-{i}.xml</loc>\n  </sitemap>\n'
    index_content += '</sitemapindex>\n'

    for index_filename in ('sitemap-index.xml', 'sitemap_index.xml'):
        with open(os.path.join(public_dir, index_filename), 'w') as f:
            f.write(index_content)
    
    # Generate individual sitemaps
    for i in range(num_sitemaps):
        start = i * urls_per_sitemap
        end = start + urls_per_sitemap
        chunk = rows[start:end]
        
        sitemap_path = os.path.join(public_dir, f'sitemap-{i+1}.xml')
        with open(sitemap_path, 'w') as f:
            f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
            for pillar, category, slug in chunk:
                # Constructing the URL based on the route pattern
                url = f"{base_url}/blog/{pillar}/{category}/{slug}/"
                f.write(f'  <url>\n    <loc>{url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>\n')
            f.write('</urlset>')
        
    print(f"Generated sitemap-index.xml and {num_sitemaps} chunked sitemaps in {public_dir}.")
    
    # robots.txt is manually maintained in astro-site/public/robots.txt — do not overwrite.
    print("Skipped robots.txt (manually maintained — edit astro-site/public/robots.txt directly).")

if __name__ == "__main__":
    build_sitemaps()

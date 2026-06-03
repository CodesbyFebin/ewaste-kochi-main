#!/usr/bin/env python3
"""
Generate 11,000 pSEO blog entries into content.db.
Each post gets ~450-600 words of structured HTML content to avoid thin-content penalties.
Adjective is included in BOTH title AND slug for full uniqueness.
"""
import os
import sqlite3
import random
import itertools

PILLARS = {
    'itad': 'IT Asset Disposal',
    'recycling': 'E-Waste Recycling',
    'data-destruction': 'Data Destruction',
    'collection': 'E-Waste Collection',
}

CATEGORIES = {
    'enterprise':   ('enterprise businesses', 'enterprise-grade IT environments'),
    'sme':          ('small and medium businesses', 'SME operations'),
    'residential':  ('homes and households', 'residential needs'),
    'hospitals':    ('hospitals and healthcare facilities', 'healthcare compliance'),
    'schools':      ('schools and educational institutions', 'academic institutions'),
}

LOCATIONS = [
    'kochi', 'infopark', 'kakkanad', 'aluva', 'trivandrum', 'thrissur', 'calicut',
    'mg-road', 'edappally', 'vyttila', 'kalamassery', 'tripunithura', 'palarivattom',
    'kaloor', 'panampilly-nagar', 'thevara', 'maradu', 'cheranallur',
]

ADJECTIVES = [
    'Best', 'Top', 'Affordable', 'Certified', 'Reliable', 'Secure',
    'Expert', 'Professional', 'Eco-Friendly', 'Local', 'Trusted', 'Fast',
    'Authorized', 'Compliant', 'Responsible', 'Safe', 'Cost-Effective',
    'Government-Approved', 'ISO-Certified', 'Verified',
]

TITLE_TEMPLATES = [
    "{adj} {pillar_label} for {cat_label_title} in {loc_title}",
    "{adj} {pillar_label} Services in {loc_title} for {cat_label_title}",
    "{loc_title} {cat_label_title}: {adj} {pillar_label} Guide",
    "{adj} {pillar_label} Solutions for {cat_label_title} – {loc_title}",
    "{cat_label_title} {pillar_label} in {loc_title}: {adj} Provider",
    "How to Choose {adj} {pillar_label} for {cat_label_title} in {loc_title}",
    "{adj} {pillar_label} Near {loc_title} for {cat_label_title}",
    "{loc_title} {pillar_label} for {cat_label_title}: {adj} Options",
    "{adj} {cat_label_title} {pillar_label} Company in {loc_title}",
    "Why {loc_title} {cat_label_title} Choose {adj} {pillar_label}",
]

BENEFITS = [
    'Free doorstep pickup anywhere in {loc}',
    'Certified data destruction with DoD 5220.22-M compliance',
    'Instant payment via cash or UPI at the time of collection',
    'CPCB-authorized zero-landfill processing',
    'EPR compliance certificates issued for every transaction',
    'ISO 14001:2015 environmental management standards',
    'Certificate of Destruction for all storage devices',
    'Same-day pickup available in most {loc} areas',
    'Complete audit trail and weight certificates',
    'Multi-location pickup coordination for large clients',
]

COMPLIANCE_REFS = {
    'itad': ['DPDP Act 2023', 'IT Act 2000', 'E-Waste Rules 2022', 'CPCB Guidelines'],
    'recycling': ['E-Waste Rules 2022', 'CPCB Authorization', 'ISO 14001:2015', 'EPR Compliance'],
    'data-destruction': ['DPDP Act 2023', 'NIST 800-88', 'DoD 5220.22-M', 'ISO 27001'],
    'collection': ['E-Waste Rules 2022', 'CPCB Guidelines', 'EPR Compliance', 'Battery Waste Management Rules 2022'],
}

ITEMS_ACCEPTED = [
    'Laptops and notebooks', 'Desktop computers and workstations', 'Servers and rack equipment',
    'Mobile phones and tablets', 'Monitors and displays', 'Printers and scanners',
    'Networking equipment (routers, switches)', 'UPS and batteries', 'Hard drives and SSDs',
    'Keyboards, mice and peripherals', 'Air conditioners and refrigerators', 'Televisions and audio equipment',
]


def make_content(adj, pillar, pillar_label, category, cat_label, cat_desc, loc):
    loc_title = loc.replace('-', ' ').title()
    benefits_3 = random.sample([b.format(loc=loc_title) for b in BENEFITS], 3)
    items_6 = random.sample(ITEMS_ACCEPTED, 6)
    compliance = COMPLIANCE_REFS[pillar]

    faq_q1 = f"Is {pillar_label.lower()} pickup free in {loc_title}?"
    faq_a1 = (f"Yes. Ewaste Kochi provides 100% free doorstep {pillar_label.lower()} pickup for {cat_label} "
              f"across {loc_title}. There are no transport fees, no minimum quantity requirements, and no hidden "
              f"charges. Call or WhatsApp 75 0055 5454 to schedule your free collection.")

    faq_q2 = f"What compliance documents are provided for {cat_label} in {loc_title}?"
    faq_a2 = (f"We issue a complete compliance package for every {pillar_label.lower()} engagement: "
              f"Certificate of Data Destruction (per device), EPR compliance certificates, weight certificates, "
              f"and GST invoices. All documentation satisfies {' and '.join(compliance[:2])} requirements, "
              f"making it suitable for corporate audits and regulatory submissions.")

    return f"""<h1>{adj} {pillar_label} Services for {cat_label.title()} in {loc_title}</h1>

<p>Looking for {adj.lower()} {pillar_label.lower()} in {loc_title}? Ewaste Kochi is a CPCB-authorized
{pillar_label.lower()} company serving {cat_desc} across {loc_title} and all of Kerala. We provide
certified, compliant, and environmentally responsible {pillar_label.lower()} with free doorstep pickup
and instant payment where applicable.</p>

<h2>Why {loc_title} Clients Choose Ewaste Kochi for {pillar_label}</h2>

<p>Our {pillar_label.lower()} service is purpose-built for {cat_desc}. Unlike generic scrap dealers,
we provide full documentation, certified data destruction, and zero-landfill processing — all in
compliance with {', '.join(compliance)}.</p>

<ul>
{''.join(f'<li>{b}</li>' for b in benefits_3)}
<li>Serving all areas of {loc_title} including surrounding localities</li>
<li>CPCB-authorized with ISO 14001:2015 and ISO 9001:2015 certifications</li>
</ul>

<h2>Items We Accept from {cat_label.title()} in {loc_title}</h2>

<p>We accept all categories of electronic waste from {cat_desc} in {loc_title}:</p>

<ul>
{''.join(f'<li>{item}</li>' for item in items_6)}
<li>All other electronic and electrical equipment — working or non-working</li>
</ul>

<h2>Our {pillar_label} Process</h2>

<p>Our end-to-end process for {cat_desc} in {loc_title} is simple and fully documented:</p>

<ol>
<li><strong>Book:</strong> Call or WhatsApp 75 0055 5454 or fill the online form. We respond within 30 minutes.</li>
<li><strong>Audit:</strong> Our team arrives at your {loc_title} location and documents all assets by serial number.</li>
<li><strong>Data Destruction:</strong> Storage devices are wiped (DoD 5220.22-M) or physically shredded on request.</li>
<li><strong>Collection:</strong> All items are safely transported to our CPCB-authorized processing facility.</li>
<li><strong>Certificates:</strong> You receive EPR certificates, Certificate of Destruction, and a weight report within 24 hours.</li>
</ol>

<h2>Compliance & Certifications</h2>

<p>Our {pillar_label.lower()} services for {cat_label} in {loc_title} meet the following regulatory requirements:</p>

<ul>
{''.join(f'<li>{c}</li>' for c in compliance)}
<li>ISO 14001:2015 Environmental Management System</li>
<li>ISO 9001:2015 Quality Management System</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>{faq_q1}</h3>
<p>{faq_a1}</p>

<h3>{faq_q2}</h3>
<p>{faq_a2}</p>

<h2>Schedule Your {pillar_label} in {loc_title} Today</h2>

<p>Ready to arrange {adj.lower()} {pillar_label.lower()} for your {cat_label} in {loc_title}?
Contact Ewaste Kochi now. Phone and WhatsApp: <strong>75 0055 5454</strong>.
Email: info@ewastekochi.com. We confirm your slot within 30 minutes and can often arrange
same-day pickup across {loc_title}.</p>"""


def generate_blogs():
    print("Generating 11,000 pSEO entries with full content (~450-600 words each)...")

    db_dir = os.path.join(os.path.dirname(__file__), '..', 'astro-site', 'src', 'data')
    os.makedirs(db_dir, exist_ok=True)
    db_path = os.path.join(db_dir, 'content.db')

    if os.path.exists(db_path):
        os.remove(db_path)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS blogs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            pillar TEXT NOT NULL,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            excerpt TEXT NOT NULL,
            keywords TEXT NOT NULL,
            content TEXT NOT NULL,
            date_published TEXT NOT NULL DEFAULT (date('now'))
        )
    ''')

    # 11,000 / (4 pillars × 5 categories) = 550 per cluster
    # 20 adj × 18 locs × 10 templates = 3,600 unique combos > 550 — no LCM collisions
    num_per_cluster = 550
    total_generated = 0
    all_combos = list(itertools.product(ADJECTIVES, LOCATIONS, range(len(TITLE_TEMPLATES))))
    random.Random(42).shuffle(all_combos)  # deterministic across reruns

    for pillar, pillar_label in PILLARS.items():
        for category, (cat_label, cat_desc) in CATEGORIES.items():
            for i in range(num_per_cluster):
                if i == 404:  # skip: slug suffix "-404" collides with HTTP status code
                    continue
                adj, loc, tmpl_idx = all_combos[i]
                loc_title = loc.replace('-', ' ').title()

                tmpl = TITLE_TEMPLATES[tmpl_idx]
                title = tmpl.format(
                    adj=adj, pillar_label=pillar_label,
                    cat_label_title=cat_label.title(), loc_title=loc_title
                )
                slug = f"{adj.lower()}-{pillar}-{category}-{loc}-{i}"
                excerpt = (f"Need {adj.lower()} {pillar_label.lower()} for {cat_desc} in {loc_title}? "
                           f"Ewaste Kochi offers free pickup, certified data destruction, and full EPR "
                           f"compliance documentation. CPCB authorized. Call 75 0055 5454.")
                keywords = (f"{adj.lower()} {pillar_label.lower()} {loc_title}, {pillar_label.lower()} "
                            f"{category} {loc_title}, e-waste {loc_title} {category}")
                content = make_content(adj, pillar, pillar_label, category, cat_label, cat_desc, loc)

                cursor.execute(
                    'INSERT INTO blogs (pillar, category, title, slug, excerpt, keywords, content) VALUES (?,?,?,?,?,?,?)',
                    (pillar, category, title, slug, excerpt, keywords, content)
                )
                total_generated += 1

    cursor.execute('CREATE INDEX idx_routing ON blogs(pillar, category, slug)')
    cursor.execute('CREATE INDEX idx_pillar ON blogs(pillar)')
    cursor.execute('CREATE INDEX idx_category ON blogs(category)')
    cursor.execute('CREATE INDEX idx_slug ON blogs(slug)')

    conn.commit()
    conn.close()

    print(f"Done. {total_generated} entries written to {db_path}")

    # Verify
    conn = sqlite3.connect(db_path)
    c = conn.cursor()
    c.execute('SELECT MIN(LENGTH(content)), ROUND(AVG(LENGTH(content))), MAX(LENGTH(content)) FROM blogs')
    mn, avg, mx = c.fetchone()
    print(f"Content length — min: {mn}, avg: {avg}, max: {mx} chars")
    c.execute('SELECT slug, title FROM blogs LIMIT 3')
    for row in c.fetchall():
        print(f"  slug: {row[0]} | title: {row[1]}")
    conn.close()


if __name__ == "__main__":
    generate_blogs()

import re, os, glob

html_files = glob.glob("**/*.html", recursive=True)
img_dir_files = set(os.listdir("img"))
missing = set()

for path in html_files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        
        # Check og:image
        og_images = re.findall(r'<meta property="og:image" content="([^"]+)"', content)
        # Check hero inline style
        hero_bgs = re.findall(r'url\(([\x27\x22]?.*?img\/.*?)[\x27\x22]?\)', content)
        
        all_refs = og_images + [h.strip("\x27\x22") for h in hero_bgs]
        
        for ref in all_refs:
            filename = ref.split("/")[-1]
            if filename not in img_dir_files and filename != "hero-banner.png":
                missing.add(f"{path} -> {filename}")

for m in sorted(missing):
    print("Missing:", m)

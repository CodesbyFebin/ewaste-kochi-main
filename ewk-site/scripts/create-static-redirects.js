const fs = require("fs");
const path = require("path");

const base = ".";
const destinations = [
  "about",
  "battery-recycling",
  "contact",
  "data-destruction",
  "e-waste-recycling",
  "faq",
  "hard-drive-shredding",
  "itad",
  "locations",
  "marketplace",
  "pickup",
  "privacy",
  "recycling",
  "sell-electronics",
  "server-recycling-kochi",
  "services",
  "services/electronics-recycling-near-me",
];

// Create index.html for each destination
for (const dest of destinations) {
  const dir = path.join(base, dest);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, "index.html");
  
  // Copy from existing HTML if available
  const sourceFile = dest.replace(/-/g, "") + ".html";
  const altSource = dest + ".html";
  
  if (fs.existsSync(altSource)) {
    fs.copyFileSync(altSource, file);
  } else if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, file);
  } else {
    // Create basic page with redirect to canonical URL
    const title = dest.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | Ewaste Kochi</title>
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://www.ewastekochi.com/${dest}/">
<meta http-equiv="refresh" content="0; url=https://www.ewastekochi.com/${dest}/">
</head>
<body>
<p>Redirecting to <a href="https://www.ewastekochi.com/${dest}/">${title}</a>...</p>
</body>
</html>`;
    fs.writeFileSync(file, html);
  }
}

// Copy all location pages
const locationsDir = path.join(base, "locations");
if (fs.existsSync(locationsDir)) {
  const locFiles = fs.readdirSync(locationsDir).filter(f => f.endsWith(".html"));
  for (const f of locFiles) {
    const slug = f.replace(".html", "");
    const destDir = path.join(locationsDir, slug);
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(path.join(locationsDir, f), path.join(destDir, "index.html"));
  }
  console.log("Copied", locFiles.length, "location pages");
}

// Copy services subdirectories
const servicesDir = path.join(base, "services");
if (fs.existsSync(servicesDir)) {
  const items = fs.readdirSync(servicesDir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      const destDir = path.join("services", item.name);
      fs.mkdirSync(destDir, { recursive: true });
      const files = fs.readdirSync(path.join(servicesDir, item.name));
      for (const f of files) {
        fs.copyFileSync(path.join(servicesDir, item.name, f), path.join(destDir, f));
      }
    }
  }
  console.log("Copied services subdirectories");
}

console.log("Done creating static pages for redirect destinations");

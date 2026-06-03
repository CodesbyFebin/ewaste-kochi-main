const Database = require("better-sqlite3");
const db = new Database("src/data/content.db", { readonly: true });
const samples = db.prepare("SELECT pillar, category, slug FROM blogs WHERE pillar = 'recycling' AND category = 'residential' LIMIT 3").all();
console.log(JSON.stringify(samples, null, 2));

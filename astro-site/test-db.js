const Database = require('better-sqlite3');
const db = new Database('src/data/content.db', { readonly: true });
const count = db.prepare('SELECT count(*) as count FROM blogs').get();
console.log(`Total blogs: ${count.count}`);

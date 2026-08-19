const fs = require('fs');
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = d + '/' + e.name;
    return e.isDirectory() ? walk(p) : [p];
  });
}
const pages = walk('src/pages/wiki').filter(f => f.endsWith('index.astro'));
let count = 0;
pages.forEach(f => {
  const txt = fs.readFileSync(f, 'utf8');
  const parts = txt.split('---');
  const fm = parts[1] || '';
  const body = parts.slice(2).join('---');
  const usesBc = /breadcrumbItems/.test(body);
  const definesBc = /const\s+breadcrumbItems\s*=/.test(fm);
  if (usesBc && !definesBc) {
    console.log(f);
    count++;
  }
});
console.log('pages using breadcrumbItems without defining it:', count);

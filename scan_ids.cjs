const fs = require('fs');
function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap(e => {
    const p = d + '/' + e.name;
    return e.isDirectory() ? walk(p) : [p];
  });
}
const pages = walk('src/pages/wiki').filter(f => f.endsWith('index.astro'));
let total = 0;
const broken = [];
pages.forEach(f => {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    const re = /id="[^">]*/g;
    let m;
    while ((m = re.exec(l))) {
      const after = m.index + m[0].length;
      const rest = l.slice(after);
      if (!rest.includes('"') && rest.includes('>')) {
        broken.push(f + ':' + (i + 1) + ' :: ' + m[0] + rest.slice(0, 50));
        total++;
        break;
      }
    }
  });
});
console.log('total broken id attributes:', total);
broken.slice(0, 80).forEach(b => console.log(b));

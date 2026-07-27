#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const articlesDir = path.join(process.cwd(), 'src/content/articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let moved = 0;
for (const file of files) {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) continue;
  const frontmatter = frontmatterMatch[1];
  const clusterMatch = frontmatter.match(/^cluster:\s*(.+)$/m);
  if (!clusterMatch) continue;
  let cluster = clusterMatch[1].trim().replace(/^["']|["']$/g, '');
  // Normalize to folder name: lowercase, replace non-alphanumeric with hyphen
  const folderName = cluster.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const targetDir = path.join(articlesDir, folderName);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const targetPath = path.join(targetDir, file);
  if (filePath !== targetPath) {
    fs.renameSync(filePath, targetPath);
    moved++;
  }
}

console.log(`Moved ${moved} articles into cluster folders.`);

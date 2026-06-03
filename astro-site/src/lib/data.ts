import Database from 'better-sqlite3';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

// In Lambda, entry.mjs lives at /var/task/.vercel/output/_functions/entry.mjs
// so __dirname-relative paths miss the DB. Try process.cwd() first (Lambda: /var/task),
// then fall back to __dirname-relative (local dev).
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwdCandidate = path.join(process.cwd(), 'src/data/content.db');
const dirCandidate = path.join(__dirname, '../data/content.db');
const dbPath = fs.existsSync(cwdCandidate) ? cwdCandidate : dirCandidate;
const db = new Database(dbPath, { readonly: true });

export interface BlogPostData {
  pillar: string;
  category: string;
  slug: string;
  title: string;
  excerpt: string;
  keywords: string;
  content?: string;
  date_published?: string; // TEXT DEFAULT date('now') in DB schema
}

export function getAllBlogs(): BlogPostData[] {
  const stmt = db.prepare('SELECT pillar, category, slug, title, excerpt, keywords FROM blogs');
  return stmt.all() as BlogPostData[];
}

export function getBlogBySlug(slug: string): BlogPostData | undefined {
  const stmt = db.prepare('SELECT * FROM blogs WHERE slug = ?');
  return stmt.get(slug) as BlogPostData | undefined;
}

export function getRelatedBlogs(category: string, currentSlug: string, limit: number = 10): BlogPostData[] {
  const stmt = db.prepare('SELECT pillar, category, slug, title FROM blogs WHERE category = ? AND slug != ? LIMIT ?');
  return stmt.all(category, currentSlug, limit) as BlogPostData[];
}

export function getBlogsByPillar(pillar: string, limit: number = 20): BlogPostData[] {
  const stmt = db.prepare('SELECT pillar, category, slug, title, excerpt FROM blogs WHERE pillar = ? LIMIT ?');
  return stmt.all(pillar, limit) as BlogPostData[];
}

export function getBlogsByCategory(category: string, limit: number = 20): BlogPostData[] {
  const stmt = db.prepare('SELECT pillar, category, slug, title, excerpt FROM blogs WHERE category = ? LIMIT ?');
  return stmt.all(category, limit) as BlogPostData[];
}

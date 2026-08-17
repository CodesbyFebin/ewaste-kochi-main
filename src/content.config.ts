// Explicit content-collection configuration.
//
// Astro 5.x deprecated implicit content-collection auto-discovery. Without
// this file, every `astro check` and `astro build` emitted:
//
//   Auto-generating collections for folders in "src/content/" that are not
//   defined as collections. This is deprecated, so you should define these
//   collections yourself in "src/content.config.ts".
//   The following collections have been auto-generated: articles
//
// Explicit definition of the `articles` collection silences the warning
// and keeps Astro's behaviour byte-for-byte compatible.
//
// The `articles` folder is an archived content directory. It previously fed a
// filesystem-scanning generator at src/pages/[cluster]/[slug].astro, which
// emitted 100 public HTML pages that bypassed src/data/routes.ts (the single
// source of truth for the sitemap, content-index, and ai-sitemap). That
// generator has been retired; no page under src/pages/ may read these files.
//
// The collection remains defined only to (a) silence Astro's auto-discovery
// warning and (b) preserve the markdown as source material. If any of these
// articles are later promoted to public URLs, they must be registered in
// src/data/routes.ts and consumed via getCollection() — never re-introduce a
// filesystem-scanning route generator.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
});

export const collections = { articles };

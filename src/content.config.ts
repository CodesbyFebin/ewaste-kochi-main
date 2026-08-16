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
// The `articles` folder is a legacy content directory consumed directly by
// src/pages/[cluster]/[slug].astro via fs.readFileSync (grayMatter) — the
// dynamic route reads the .md files by path rather than via the Astro
// content-collections query API. This collection therefore exists only to
// satisfy Astro's registry; nothing queries it via getCollection().
//
// If a future refactor moves the [cluster]/[slug] page to the collections
// API, the schema below can be extended with a Zod schema for frontmatter.
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
});

export const collections = { articles };

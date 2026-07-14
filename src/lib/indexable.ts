import type { RouteEntry } from "../data/routes";

// A route is indexable unless explicitly marked otherwise. Every route of
// type "blog" carries an explicit value (see routes.ts); non-blog routes
// default to indexable since they predate this field and are all reviewed,
// hand-authored pages.
export function isIndexable(route: RouteEntry): boolean {
  return route.indexable !== false;
}

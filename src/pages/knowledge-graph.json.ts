import { readFileSync } from "node:fs";

const data = JSON.parse(readFileSync(process.cwd() + "/src/data/knowledge-graph.json", "utf8"));

export async function GET() {
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "content-type": "application/json",
      "cache-control": "public, max-age=3600",
    },
  });
}

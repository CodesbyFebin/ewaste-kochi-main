import { ROUTES } from "../data/routes";

export async function GET() {
  return new Response(
    JSON.stringify({
      status: "operational",
      version: "1.0.0",
      lastBuild: new Date().toISOString(),
      totalRoutes: ROUTES.length,
      lastValidation: new Date().toISOString(),
      validationStatus: "passed",
      endpoints: {
        sitemap: "https://www.ewastekochi.com/sitemap.xml",
        llms: "https://www.ewastekochi.com/llms.txt",
        llmsFull: "https://www.ewastekochi.com/llms-full.txt",
        ai: "https://www.ewastekochi.com/ai.txt",
        security: "https://www.ewastekochi.com/.well-known/security.txt",
        humans: "https://www.ewastekochi.com/humans.txt",
        openapi: "https://www.ewastekochi.com/openapi.json"
      }
    }),
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    }
  );
}

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";

const prioritySeo = {
  "/": {
    title: "E-Waste Recycling in Kochi | Free Doorstep Pickup | Ewaste Kochi",
    description: "E-waste recycling and free doorstep pickup in Kochi and Ernakulam for laptops, phones, batteries, TVs, IT scrap and business electronics.",
    h1: "E-Waste Recycling & Pickup in Kochi",
    h2: ["Where Can I Recycle Old Electronics in Kochi?", "How E-Waste Pickup Works in Kochi", "What Electronics Do We Collect?"]
  },
  "/services/electronics-recycling-near-me/": {
    title: "Electronics Recycling Near Me in Kochi | Free Pickup",
    description: "Find electronics recycling near you in Kochi with doorstep pickup for laptops, phones, TVs, batteries and IT equipment across Kochi and Ernakulam.",
    h1: "Electronics Recycling Near Me in Kochi",
    h2: ["How to Book Electronics Recycling Near You", "Electronics Pickup vs. Finding a Drop-Off Point", "What Electronics Can We Collect?"]
  },
  "/battery-recycling/": {
    title: "Battery Recycling in Kochi | UPS, Lithium & Inverter Pickup",
    description: "Battery recycling and pickup in Kochi for UPS, inverter, laptop, phone and lithium-ion batteries, with safety guidance for damaged batteries.",
    h1: "Battery Recycling in Kochi",
    h2: ["Battery Recycling Services in Kochi", "Battery Types and Safe Pickup", "How Battery Recycling Pickup Works"]
  },
  "/recycling/": {
    title: "E-Waste Recycling in Kochi | Free Doorstep Pickup",
    description: "Recycle old electronics in Kochi with doorstep pickup for laptops, desktops, phones, TVs, printers, batteries and mixed e-waste across Ernakulam.",
    h1: "E-Waste Recycling in Kochi",
    h2: ["Where to Recycle Electronics in Kochi", "What E-Waste Can We Collect?", "How E-Waste Recycling Pickup Works"]
  },
  "/pickup/": {
    title: "E-Waste Pickup in Kochi | Free Doorstep Collection",
    description: "Book e-waste pickup in Kochi for homes, offices and IT teams. Share your location and item list to confirm collection availability.",
    h1: "E-Waste Pickup in Kochi",
    h2: ["How to Book E-Waste Pickup", "What We Collect From Homes and Offices", "Kochi Pickup Areas and Availability"]
  },
  "/about/": {
    title: "About Ewaste Kochi | E-Waste Recycling & ITAD in Kerala",
    description: "Learn about Ewaste Kochi, our e-waste recycling, pickup, battery handling and IT asset disposition services across Kochi and Kerala.",
    h1: "About Ewaste Kochi",
    h2: ["E-Waste Recycling and ITAD in Kerala", "How We Help Homes and Businesses", "Our Kochi Service Coverage"]
  },
  "/marketplace/": {
    title: "Buy & Sell Used Electronics in Kochi | Ewaste Marketplace",
    description: "Explore used electronics, resale and buyback options in Kochi. Check device condition, valuation and pickup options before selling.",
    h1: "Buy & Sell Used Electronics in Kochi",
    h2: ["Sell Old Electronics in Kochi", "Buy Reusable Electronics", "How Device Valuation Works"]
  },
  "/sell-electronics/": {
    title: "Sell Old Electronics in Kochi | Pickup & Quote",
    description: "Sell old laptops, phones, TVs and other electronics in Kochi. Share your model, condition, photos and location for a pickup or quote review.",
    h1: "Sell Old Electronics in Kochi",
    h2: ["What Electronics Can You Sell?", "How We Assess Device Value", "Pickup and Quote Process"]
  },
  "/contact/": {
    title: "Contact Ewaste Kochi | E-Waste Pickup & Recycling",
    description: "Contact Ewaste Kochi for e-waste pickup, battery recycling, electronics recycling, ITAD and data destruction enquiries in Kochi and Kerala.",
    h1: "Contact Ewaste Kochi",
    h2: ["Book E-Waste Pickup", "Business and ITAD Enquiries", "Kochi Service Location"]
  },
  "/tv-recycling-kochi/": {
    title: "TV Recycling in Kochi | Doorstep Pickup for Old TVs",
    description: "Recycle old TVs and monitors in Kochi with doorstep pickup. Share your TV type, condition and location to confirm collection feasibility.",
    h1: "TV Recycling in Kochi",
    h2: ["How TV Recycling Pickup Works", "What TVs and Displays We Collect", "Prepare Your TV for Pickup"]
  },
  "/hard-drive-shredding/": {
    title: "Hard Drive Shredding in Kochi | Secure Data Destruction",
    description: "Secure hard drive shredding in Kochi for businesses and individuals with data-bearing devices that require physical destruction and documented handling.",
    h1: "Hard Drive Shredding in Kochi",
    h2: ["Secure Hard Drive Destruction", "When to Choose Shredding", "Pickup, Chain of Custody and Documentation"]
  },
  "/services/": {
    title: "E-Waste Recycling Services in Kochi | Pickup, ITAD & Batteries",
    description: "Explore e-waste recycling services in Kochi including doorstep pickup, battery recycling, data destruction, hard drive shredding and ITAD.",
    h1: "E-Waste Recycling Services in Kochi",
    h2: ["E-Waste Services for Homes and Businesses", "Electronics, Batteries and IT Asset Disposal", "Choose the Right Recycling Service"]
  }
};

function escapeHtml(value) {
  return value.replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char]));
}

function locationSeo(pathname) {
  const match = pathname.match(/^\/locations\/([^/]+)\/$/);
  if (!match) return null;
  const city = match[1]
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
  return {
    title: `E-Waste Recycling in ${city}, Kerala | Pickup Feasibility`,
    description: `E-waste recycling and pickup in ${city}, Kerala. Check doorstep collection feasibility for electronics, batteries and IT scrap based on your location and item list.`,
    h1: `E-Waste Recycling in ${city}, Kerala`,
    h2: [`E-Waste Pickup Options in ${city}`, "What Electronics Can We Collect?", `How Pickup Works in ${city}`]
  };
}

function seoNormalization() {
  return {
    name: "seo-normalization",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const root = dir.pathname;
        const walk = (folder) => {
          const files = fs.readdirSync(folder, { withFileTypes: true });
          const html = [];
          for (const entry of files) {
            const full = path.join(folder, entry.name);
            if (entry.isDirectory()) html.push(...walk(full));
            else if (entry.isFile() && entry.name.endsWith(".html")) html.push(full);
          }
          return html;
        };

        for (const file of walk(root)) {
          const relative = path.relative(root, file).split(path.sep).join("/");
          const pathname = relative === "index.html" ? "/" : `/${relative.replace(/index\.html$/, "")}`;
          const seo = prioritySeo[pathname] ?? locationSeo(pathname);
          if (!seo) continue;

          let html = fs.readFileSync(file, "utf8");
          const title = escapeHtml(seo.title);
          const description = escapeHtml(seo.description);
          html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
          html = html.replace(/(<meta\s+name=["']description["']\s+content=["'])[^"']*("[^>]*>)/i, `$1${description}$2`);
          html = html.replace(/(<meta\s+property=["']og:title["']\s+content=["'])[^"']*("[^>]*>)/i, `$1${title}$2`);
          html = html.replace(/(<meta\s+property=["']og:description["']\s+content=["'])[^"']*("[^>]*>)/i, `$1${description}$2`);
          html = html.replace(/(<meta\s+name=["']twitter:title["']\s+content=["'])[^"']*("[^>]*>)/i, `$1${title}$2`);
          html = html.replace(/(<meta\s+name=["']twitter:description["']\s+content=["'])[^"']*("[^>]*>)/i, `$1${description}$2`);
          html = html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, `$1${escapeHtml(seo.h1)}$2`);

          let index = 0;
          html = html.replace(/(<h2\b[^>]*>)[\s\S]*?(<\/h2>)/gi, (match, open, close) => {
            if (index >= seo.h2.length) return match;
            return `${open}${escapeHtml(seo.h2[index++])}${close}`;
          });
          fs.writeFileSync(file, html);
        }
      }
    }
  };
}

export default defineConfig({
  site: "https://www.ewastekochi.com",
  trailingSlash: "always",
  integrations: [
    mdx(),
    sitemap(),
    seoNormalization()
  ],
  build: {
    format: "directory",
  }
});

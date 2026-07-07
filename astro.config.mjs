import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.ewastekochi.com",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});

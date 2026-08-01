// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { site } from "./src/lib/site.ts";

// https://astro.build/config
export default defineConfig({
  site: site.origin,
  base: site.base,
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/status\/\d+\/?$/.test(page),
    }),
  ],
});

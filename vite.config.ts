import { fileURLToPath, URL } from "node:url";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: "autoUpdate",
  manifest: {
    name: "Movie Jar",
    short_name: "Movie Jar",
    theme_color: "#198754",
    icons: [
      {
        src: "film_192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/film_512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "film_512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "film_192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA(pwaOptions)],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

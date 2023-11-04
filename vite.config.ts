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
        src: "assets/pwa_192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/pwa_512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "assets/pwa_512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "assets/pwa_192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "assets/pwa_144.png", // <== don't add slash, for testing
        sizes: "144x144",
        type: "image/png",
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

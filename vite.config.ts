import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: "prompt",
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        manifest: {
          name: "Lettura Facile",
          short_name: "Lettura",
          description:
            "A distraction-free language reading assistant using Mistral AI for simplification and translation.",
          theme_color: "#4f46e5",
          background_color: "#fafaf9",
          display: "standalone",
          icons: [
            {
              src: "icon-48x48.png",
              sizes: "48x48",
              type: "image/png",
            },
            {
              src: "icon-72x72.png",
              sizes: "72x72",
              type: "image/png",
            },
            {
              src: "icon-96x96.png",
              sizes: "96x96",
              type: "image/png",
            },
            {
              src: "icon-128x128.png",
              sizes: "128x128",
              type: "image/png",
            },
            {
              src: "icon-144x144.png",
              sizes: "144x144",
              type: "image/png",
            },
            {
              src: "icon-152x152.png",
              sizes: "152x152",
              type: "image/png",
            },
            {
              src: "icon-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icon-256x256.png",
              sizes: "256x256",
              type: "image/png",
            },
            {
              src: "icon-384x384.png",
              sizes: "384x384",
              type: "image/png",
            },
            {
              src: "icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable", // <-- Добавили для красивого отображения на Android
            },
          ],
          share_target: {
            action: "/",
            method: "GET",
            params: {
              title: "title",
              text: "text",
              url: "url"
            }
          }
        },
      }),
    ],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});

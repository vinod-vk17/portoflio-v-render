import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const plugins = [
  react(),
  runtimeErrorOverlay(),
];

// Only add Replit plugins in development on Replit
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  try {
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer());
  } catch (e) {
    // Optional plugin, fail silently
  }
  try {
    const { devBanner } = await import("@replit/vite-plugin-dev-banner");
    plugins.push(devBanner());
  } catch (e) {
    // Optional plugin, fail silently
  }
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: false,
      deny: ["**/.*"],
    },
  },
});

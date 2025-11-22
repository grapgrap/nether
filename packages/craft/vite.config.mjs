import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { default as react } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
});

export default config;

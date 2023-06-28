import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  include: ["./src/**/*.{ts,tsx}"],
  exclude: ["./src/**/*.stories.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "./css",
});

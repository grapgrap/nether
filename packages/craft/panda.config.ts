import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@pandacss/preset-base", "@pandacss/preset-panda"],
  include: ["./src/**.{ts,tsx}"],
  jsxFramework: "react",
  outdir: "./css",
});

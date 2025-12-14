import react from "@eslint-react/eslint-plugin";
import hooks from "eslint-plugin-react-hooks";
import refresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import base from "./base.mjs";

export default defineConfig(
  base,
  react.configs["recommended-typescript"],
  hooks.configs.flat.recommended,
  refresh.configs.recommended,
  {
    rules: {
      "react-refresh/only-export-components": "off",
    },
  }
);

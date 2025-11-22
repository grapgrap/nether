import js from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export default defineConfig(
  js.configs.recommended,
  ts.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        ...globals.vitest,
      },
    },
  }
);

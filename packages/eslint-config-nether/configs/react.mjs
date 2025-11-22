import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import refresh from "eslint-plugin-react-refresh";
import { defineConfig } from "eslint/config";
import base from "./base.mjs";

export default defineConfig(base, react.configs.flat.recommended, hooks.configs.flat.recommended, refresh.configs.recommended);

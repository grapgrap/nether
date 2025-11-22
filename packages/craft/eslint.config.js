import react from "eslint-config-nether/react";

import { defineConfig } from "eslint/config";

export default defineConfig(globalIgnores(["dist"]), react);

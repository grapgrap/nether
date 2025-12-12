import react from "eslint-config-nether/react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(globalIgnores(["dist", "build", ".react-router"]), react);

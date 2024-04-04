import { createAppServer } from "@nether/dev-server";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const { start } = await createAppServer({
  rootDir: path.join(__dirname, "../dist"),
  port: 3000,
  spa: true,
});

await start();

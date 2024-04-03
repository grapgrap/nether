import fs from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const build = async (options) => {
  const configPath = options.configPath || "webpack.config.mjs";
  const require = createRequire(import.meta.url);

  const { webpack } = require("webpack");
  const { default: config } = await import(
    path.resolve(process.cwd(), configPath)
  );

  const compiler = webpack(config);

  compiler.run(async (error, stats) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }

    const results = stats.toJson({
      ids: true,
    });

    await fs.writeFile(
      path.resolve(config.output.path, "build-stats.json"),
      JSON.stringify(results, null, 2),
      "utf-8"
    );
    console.log("build complete");
  });
};

build({ configPath: "webpack.config.mjs" });

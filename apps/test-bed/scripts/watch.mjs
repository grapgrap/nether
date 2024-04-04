import { Watcher } from "@nether/argus";
import { createAppServer } from "@nether/dev-server";
import { createRequire } from "node:module";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const build = async () => {
  const configPath = "webpack.config.mjs";
  const require = createRequire(import.meta.url);

  const { webpack } = require("webpack");
  const { default: config } = await import(
    path.resolve(process.cwd(), configPath)
  );

  const promise = new Promise((resolve, reject) => {
    const compiler = webpack(config);
    compiler.run((error, stats) => {
      if (error) {
        reject(error);
      }
      resolve(stats);
    });
  });

  return promise;
};

console.log("watching");

const watcher = new Watcher({
  rootPath: path.join(__dirname, "../src"),
});

let oldServer = {
  stop: () => {},
};

await watcher.subscribe(async () => {
  oldServer.stop();

  const { start, stop } = await createAppServer({
    rootDir: path.join(__dirname, "../dist"),
    port: 3000,
    spa: true,
  });

  oldServer.stop = stop;

  const result = await build();
  console.log(result.toString());
  console.log();

  await start();
});

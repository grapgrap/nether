import { cli } from "./cli.mjs";
import { WatchCommand } from "./commands/watch.mjs";

const [, , ...args] = process.argv;

cli.register(WatchCommand);
cli.runExit(args);

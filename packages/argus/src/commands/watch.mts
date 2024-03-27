import { Command } from "clipanion";
import { Watcher } from "../Watcher.mjs";

export class WatchCommand extends Command {
  static paths = [["watch"]];

  #watcher: Watcher;

  constructor() {
    super();
    this.#watcher = new Watcher({ rootPath: process.cwd() });
  }

  async execute() {
    this.#watcher.subscribe((events) => console.log(events));

    await new Promise(() => {});
  }
}

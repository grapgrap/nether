import { subscribe } from "@parcel/watcher";

import { EventQueue } from "./EventQueue.mjs";
import { ArgusError } from "./error.mjs";
import type { FileChangeEvent, GlobPattern, Path } from "./type.mjs";

export type Callback = (events: FileChangeEvent[]) => void;

export interface WatcherOptions {
  rootPath: Path;
  excludes?: GlobPattern[];
  throttle?: number;
}

const DEFAULT_THROTTLE = 300;

export class Watcher {
  #options: WatcherOptions;
  #queue: EventQueue;
  #timer: NodeJS.Timeout | null = null;

  constructor(options: WatcherOptions) {
    this.#options = options;
    this.#queue = new EventQueue();
  }

  #runWithThrottle(callback: Callback) {
    if (this.#timer) {
      return;
    }

    this.#timer = setTimeout(() => {
      const events = this.#queue.flush();
      if (events.length > 0) {
        callback(events);
      }

      this.#timer = null;
    }, this.#options.throttle ?? DEFAULT_THROTTLE);
  }

  public async subscribe(callback: Callback) {
    const subscription = await subscribe(
      this.#options.rootPath,
      (error, events) => {
        if (error) {
          throw new WatcherError(error.message);
        }

        events.map((event) => this.#queue.push(event));
        this.#runWithThrottle(callback);
      },
      { ignore: this.#options.excludes }
    );

    const unsubscribe = async () => {
      if (this.#timer) {
        clearTimeout(this.#timer);
        this.#timer = null;
      }

      await subscription.unsubscribe();
    };

    return { unsubscribe };
  }
}

class WatcherError extends ArgusError {
  name = "WatcherError";
}

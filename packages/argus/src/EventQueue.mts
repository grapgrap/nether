import type { FileChangeEvent, FileChangeType, Path } from "./type.mjs";

const priority: readonly FileChangeType[] = ["create", "update", "delete"];

export class EventQueue {
  #queue: Map<Path, FileChangeEvent>;

  constructor() {
    this.#queue = new Map<Path, FileChangeEvent>();
  }

  flush(): FileChangeEvent[] {
    const events = Array.from(this.#queue.values());
    this.#queue.clear();
    return events;
  }

  push(newEvent: FileChangeEvent): void {
    const oldEvent = this.#queue.get(newEvent.path);
    if (oldEvent) {
      const newEventPriority = priority.indexOf(newEvent.type);
      const oldEventPriority = priority.indexOf(oldEvent.type);

      if (oldEventPriority > newEventPriority) {
        return;
      }
    }

    this.#queue.set(newEvent.path, newEvent);
  }

  get size(): number {
    return this.#queue.size;
  }
}

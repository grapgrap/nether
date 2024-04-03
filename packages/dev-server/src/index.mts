import { createServer } from "./createServer.mjs";

const server = createServer({ port: 8080 });

await server.start();

import websocket from "@fastify/websocket";
import { fastify } from "fastify";
import type { RawData, WebSocket } from "ws";

interface ServerOptions {
  port?: number;
}

export const createServer = (options: ServerOptions) => {
  const port = options.port ?? 3000;

  const server = fastify({ logger: true });
  server.register(websocket);

  server.get("/", { websocket: true }, (socket: WebSocket) => {
    socket.on("message", (message: RawData) => {
      console.log("received message", message.toString());
      socket.send("hello from server!");
    });
  });

  const start = async () => {
    try {
      await server.listen({ port });
      console.log(`server listening on ${port}`);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  };

  const stop = async () => {
    await server.close();
  };

  return {
    server,
    start,
    stop,
  };
};

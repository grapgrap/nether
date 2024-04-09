import { fastify } from "fastify";

export interface HmrServerOptions {
  port?: number;
  maxPayload?: number;
}

export const createHmrServer = async (options: HmrServerOptions) => {
  const maxPayload = options.maxPayload || 1048576;
  const port = options.port || 3001;

  const server = fastify({ logger: true });
  const { fastifyWebsocket } = await import("@fastify/websocket");

  server.register(fastifyWebsocket, {
    options: {
      maxPayload,
    },
  });

  server.register(async (server) => {
    server.get("/__hmr", { websocket: true }, (socket) => {
      events.map((event) => {
        socket.on(event.name);
      });
    });
  });

  const start = async () => {
    await server.listen({ port }, (error, address) => {
      if (error) {
        server.log.error(error);
        process.exit(1);
      }

      server.log.info(`HMR Server listening at ${address}`);
    });
  };

  const stop = async () => {
    await server.close();
  };

  return { server, start, stop };
};

const events = [
  {
    name: "",
    handler: () => {},
  },
];

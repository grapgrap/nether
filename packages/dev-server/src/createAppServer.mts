import { fastify } from "fastify";

export interface AppServerOptions {
  rootDir: string;
  port?: number;
  prefix?: string;
  spa?: boolean;
}

export const createAppServer = async (options: AppServerOptions) => {
  const rootDir = options.rootDir;
  const port = options.port || 3000;
  const prefix = options.prefix || "/";
  const spa = options.spa || false;

  const server = fastify({ logger: true });
  const { fastifyStatic } = await import("@fastify/static");

  server.register(fastifyStatic, {
    root: rootDir,
    prefix: prefix,
  });

  if (spa) {
    server.setNotFoundHandler((_, reply) => {
      reply.status(200).sendFile("index.html");
    });
  }

  const start = async () => {
    await server.listen({ port }, (error, address) => {
      if (error) {
        server.log.error(error);
        process.exit(1);
      }

      server.log.info(`Server listening at ${address}`);
    });
  };

  const stop = async () => {
    await server.close();
  };

  return { server, start, stop };
};

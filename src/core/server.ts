import { ILogObj, Logger } from "tslog";

import { Router } from "./router";
import { Database } from "./database";

const log = new Logger<ILogObj>({
  minLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 3,
});

const router = new Router(log);

// preload database
Database.preload();

const server = Bun.serve({
  port: 3000,
  fetch: router.routes,
});

console.log(`Listening on http://localhost:${server.port} ...`);

export type { server };

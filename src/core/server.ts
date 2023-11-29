import { ILogObj, Logger } from "tslog";

import { Router } from "./router";
import { NaiveDatabase } from "../database";
import { Terminology } from "../terminology/terminology";
import { TerminologyDatabase } from "../database/terminology-database";

const log = new Logger<ILogObj>({
  minLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 3,
});

export class Server {
  router: Router;
  database: TerminologyDatabase;

  constructor() {
    this.router = new Router(log);
    this.database = NaiveDatabase.getDatabase();
  }

  start() {
    const server = Bun.serve({
      port: 3000,
      fetch: this.router.routes,
      error: this.router.error,
    });

    console.log(`Listening on http://localhost:${server.port} ...`);

    return server;
  }

  register(terminologies: Terminology[]) {
    for (const terminology of terminologies) {
      console.log(`Registering ${terminology.name} ...`);
      this.database.register(terminology);
    }
  }
}

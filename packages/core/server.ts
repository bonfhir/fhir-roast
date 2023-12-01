import { ILogObj, Logger } from "tslog";
import { Router } from "./router";
import { Terminology } from "../terminology/terminology";
import { TerminologyDatabase } from "../database/terminology-database";
import { SQLiteDatabase } from "../database/sqlite-database";

const log = new Logger<ILogObj>({
  minLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 3,
});

export class Server {
  private router: Router;
  private database: TerminologyDatabase;

  constructor() {
    this.database = new SQLiteDatabase();
    this.router = new Router(this, log);
  }

  getDatabase() {
    return this.database;
  }

  start() {
    const server = Bun.serve({
      port: 3000,
      fetch: (req) => this.router.routes(req),
      error: (err) => this.router.error(err),
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

import { ILogObj, Logger } from "tslog";
import { Router } from "./router";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyDatabase, SQLiteDatabase } from "@fhir-roast/database";
import { Server as BunServer } from "bun";
import { Configuration } from "./configuration";

const log = new Logger<ILogObj>({
  minLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 3,
});

export class Server {
  private server: BunServer | null;
  private router: Router;
  private database: TerminologyDatabase;
  private config: Configuration;

  constructor() {
    this.server = null;
    this.config = new Configuration();
    this.database = new SQLiteDatabase();
    this.router = new Router(this, log);
  }

  getDatabase() {
    return this.database;
  }

  start(): void {
    this.server = Bun.serve({
      hostname: this.config.hostname,
      port: this.config.port,
      fetch: (req) => this.router.routes(req),
      error: (err) => this.router.error(err),
    });

    console.log(`Listening on http://localhost:${this.server.port} ...`);
  }

  stop(): void {
    console.log("Stopping ...");
    this.server?.stop();
  }

  register(terminologies: Terminology[]) {
    for (const terminology of terminologies) {
      console.log(`Registering ${terminology.name} ...`);
      this.database.register(terminology);
    }
  }
}

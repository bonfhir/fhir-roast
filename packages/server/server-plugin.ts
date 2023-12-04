import { App, PluginTemplate, type DatabaseInterface } from "@fhir-roast/core";
import { ILogObj, Logger } from "tslog";
import { Router } from "./router";
import { Server as BunServer } from "bun";
import { Configuration } from "./configuration";

const log = new Logger<ILogObj>({
  minLevel: process.env.LOG_LEVEL ? parseInt(process.env.LOG_LEVEL) : 3,
});

export class ServerPlugin extends PluginTemplate<App> {
  name: string = "server";
  version: string = "0.1.0";

  private server: BunServer | null;
  private router: Router;

  private config: Configuration;

  constructor(app: App) {
    super(app);
    this.server = null;
    this.config = new Configuration();
    this.router = new Router(this, log);
  }

  async start() {
    this.server = Bun.serve({
      hostname: this.config.hostname,
      port: this.config.port,
      fetch: (req) => this.router.routes(req),
      error: (err) => this.router.error(err),
    });

    console.log(`Listening on http://localhost:${this.server.port} ...`);
  }

  async stop() {
    console.log("Stopping ...");
    this.server?.stop();
  }

  getDatabase<T = DatabaseInterface>(): T | undefined {
    return this.app.getDatabase();
  }
}

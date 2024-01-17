import {
  App,
  PluginTemplate,
  type DatabaseInterface,
  type ResponderInterface,
} from "@fhir-roast/core";
import { type ILogObj, createLogger } from "@fhir-roast/utils";
import { Router } from "./router";
import { Server as BunServer } from "bun";
import { Configuration } from "./configuration";

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
    this.router = new Router(this, this.log);
  }

  async start() {
    this.server = Bun.serve({
      hostname: this.config.hostname,
      port: this.config.port,
      fetch: (request, server) => this.router.routes(request, server),
      error: (err) => this.router.error(err),
    });

    this.log.info(`Listening on http://localhost:${this.server.port} ...`);
  }

  async stop() {
    this.log.info("Stopping ...");
    this.server?.stop();
  }

  getDatabase<T = DatabaseInterface>(): T | undefined {
    return this.app.getDatabase();
  }

  getBrowser<T = ResponderInterface>(): T | undefined {
    return this.app.getBrowser();
  }
}

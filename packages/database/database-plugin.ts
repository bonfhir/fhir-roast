import { App, PluginTemplate } from "@fhir-roast/core";
import { SQLiteDatabase } from "./sqlite-database";
import { TerminologyDatabase } from "./terminology-database";
import { Terminology } from "@fhir-roast/terminology";

export class DatabasePlugin extends PluginTemplate<App> {
  name: string = "database";
  version: string = "0.1.0";

  private database: TerminologyDatabase;

  constructor(app: App) {
    super(app);
    this.database = new SQLiteDatabase();
  }

  getDatabase(): TerminologyDatabase {
    return this.database;
  }

  async start() {
    return this.database.start();
  }
  async stop() {
    return this.database.stop();
  }

  async register(terminologies: Terminology[]) {
    for (const terminology of terminologies) {
      console.log(`Registering ${terminology.name} ...`);
      this.database.register(terminology);
    }
  }
}

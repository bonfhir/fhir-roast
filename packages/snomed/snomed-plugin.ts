import { App, DatabaseInterface, PluginTemplate } from "@fhir-roast/core";
import { TerminologyManager, TerminologyPlugin } from "@fhir-roast/terminology";
import { SNOMED } from "./snomed";

export class SNOMEDPlugin extends PluginTemplate<App> {
  name: string = "snomed";
  version: string = "0.1.0";

  private terminologyManager: TerminologyManager | undefined;
  private terminologyPlugin: TerminologyPlugin | undefined;

  terminology: SNOMED;

  constructor(app: App) {
    super(app);
    this.terminology = new SNOMED();
    this.terminologyPlugin = this.app.pluginManager.getPlugin("terminology") as
      | TerminologyPlugin
      | undefined;
    this.terminologyManager = this.terminologyPlugin?.terminologyManager;
  }

  private getDatabase(): DatabaseInterface | undefined {
    return this.app.getDatabase();
  }

  async start() {
    console.log("snomed plugin started");
    this.terminologyManager?.register(this.terminology);
    this.getDatabase()?.register(this.terminology);
  }

  async stop() {
    console.log("snomed plugin stopped");
    this.getDatabase()?.unregister(this.terminology);
    this.terminologyManager?.unregister(this.terminology);
  }
}

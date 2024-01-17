import { App, PluginTemplate } from "@fhir-roast/core";
import { TerminologyManager } from "./terminology-manager";

export class TerminologyPlugin extends PluginTemplate<App> {
  name = "terminology";
  version = "0.1.0";
  terminologyManager: TerminologyManager;

  constructor(app: App) {
    super(app);
    this.terminologyManager = new TerminologyManager();
  }

  async start() {
    this.log.info("terminology plugin started");
  }

  async stop() {
    this.log.info("terminology plugin stopped");
  }
}

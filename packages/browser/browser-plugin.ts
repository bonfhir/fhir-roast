import { PluginTemplate, App } from "@fhir-roast/core";

export class BrowserPlugin extends PluginTemplate<App> {
  name = "browser";
  version = "0.1.0";

  constructor(app: App) {
    super(app);
  }

  async start() {
    console.log("browser plugin started");
  }

  async stop() {
    console.log("browser plugin stopped");
  }
}

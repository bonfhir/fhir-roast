import { PluginTemplate, App } from "@fhir-roast/core";
import { BrowserResponder } from "./browser-responder";
import { ResponderInterface } from "@fhir-roast/core";

export class BrowserPlugin extends PluginTemplate<App> {
  name = "browser";
  version = "0.1.0";

  private browserResponder: BrowserResponder;

  constructor(app: App) {
    super(app);
    this.browserResponder = new BrowserResponder();
  }

  async start() {
    this.log.info("browser plugin started");
    await this.browserResponder.init();
  }

  async stop() {
    this.log.info("browser plugin stopped");
  }

  getResponder(): ResponderInterface {
    return this.browserResponder;
  }
}

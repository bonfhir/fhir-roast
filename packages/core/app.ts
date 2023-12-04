import { PluginManager } from "./plugin-manager";

export class App {
  pluginManager = new PluginManager<App>();

  constructor() {}

  start() {
    this.pluginManager.loadDir(this, "./plugins");
  }

  stop() {
    this.pluginManager.unloadAll();
  }

  // TODO: investigate if there is a better/cleaner way to do this
  getDatabase() {
    return (
      this.pluginManager.getPlugin("database") as unknown as any
    )?.getDatabase();
  }
}

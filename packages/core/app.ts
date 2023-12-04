import { PluginManager } from "./plugin-manager";

interface DatabaseInterface<T = any> {
  getDatabase(): T;
}

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
  getDatabase<T>(): T | undefined {
    return (
      this.pluginManager.getPlugin("database") as unknown as
        | DatabaseInterface<T>
        | undefined
    )?.getDatabase();
  }
}

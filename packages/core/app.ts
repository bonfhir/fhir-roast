import { PluginManager } from "./plugin-manager";

interface DatabaseInterface<T = any> {
  getDatabase(): T;
}

interface ResponderInterface<T = any> {
  getResponder(): T;
}

export class App {
  pluginManager = new PluginManager<App>();

  constructor() {}

  async start() {
    await this.pluginManager.loadDir(this, "./packages");
    await this.pluginManager.loadDir(this, "./plugins");
  }

  async stop() {
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

  getBrowser<T>(): T | undefined {
    return (
      this.pluginManager.getPlugin("browser") as unknown as
        | ResponderInterface<T>
        | undefined
    )?.getResponder();
  }
}

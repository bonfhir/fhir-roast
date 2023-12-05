import { readdir } from "fs/promises";
import { join } from "path";
import { PluginTemplate } from "./plugin-template";

export class PluginManager<T> {
  private plugins: PluginTemplate<T>[] = [];

  getPlugin(pluginName: string): PluginTemplate<T> | undefined {
    return this.plugins.find((plugin) => plugin.name === pluginName);
  }

  async load(plugin: PluginTemplate<T>): Promise<void> {
    this.plugins.push(plugin);
    await plugin.start();
  }

  async unload(pluginName: string): Promise<boolean> {
    const plugin = this.plugins.find((plugin) => plugin.name === pluginName);
    if (!plugin) return false;
    await plugin.stop();
    return true;
  }

  async loadDir(app: T, dir: string) {
    const files = await readdir(dir, { withFileTypes: true });
    for (const file of files.filter((file) => file.isDirectory())) {
      // current working directory is used to resolve the path to the plugins directory.
      if (file.name === "typescript-config") continue;
      try {
        const module = await import(join(process.cwd(), dir, file.name));
        if (module && module.default) {
          const plugin = new module.default(app);
          await this.load(plugin as PluginTemplate<T>);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async unloadAll() {
    for (const plugin of this.plugins) {
      await plugin.stop();
    }
  }
}

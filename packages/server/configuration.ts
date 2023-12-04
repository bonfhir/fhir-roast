import { readFileSync } from "fs";
import { parse } from "toml";

interface FHIRRoastConfiguration {
  server?:
    | {
        port?: number | null | undefined;
        hostname?: string | null | undefined;
      }
    | null
    | undefined;
}

export class Configuration {
  port: number = 3000;
  hostname: string = "0.0.0.0";

  constructor() {
    try {
      const filePath = "./config/roast.toml";
      const file = readFileSync(filePath, "utf8");
      const data = parse(file) as FHIRRoastConfiguration;
      this.port = data.server?.port ?? this.port;
      this.hostname = data.server?.hostname ?? this.hostname;
    } catch (err) {
      console.error(err);
    }
  }
}

import config from "../../../config/roast.toml";

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
    const data = config as FHIRRoastConfiguration;
    this.port = data.server?.port ?? this.port;
    this.hostname = data.server?.hostname ?? this.hostname;
  }
}

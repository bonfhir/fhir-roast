import { createLogger, type ILogObj, type Logger } from "@fhir-roast/utils";
export abstract class PluginTemplate<T> {
  abstract name: string;
  abstract version: string;

  app: T;
  _log: Logger<ILogObj> | undefined;

  constructor(app: T) {
    this.app = app;
  }

  get log(): Logger<ILogObj> {
    if (!this._log) {
      this._log = createLogger(this.name);
    }
    return this._log;
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;
}

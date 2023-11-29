import { TerminologyRecord } from "../database/terminology-record";

export abstract class Terminology {
  name: string;
  version: string;
  url: string;

  constructor(name: string, version: string, url: string) {
    this.name = name;
    this.version = version;
    this.url = url;
  }

  abstract import(): TerminologyRecord[];
}

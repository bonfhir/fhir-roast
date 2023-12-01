import { Terminology } from "./terminology";

export class TerminologyManager {
  private static availableTerminologies: Terminology[] = [];

  static load(urls: string[]): Terminology[] {
    console.log(`Loading ${urls.length} terminologies ...`);
    return this.availableTerminologies.filter((terminology) =>
      terminology.url ? urls.includes(terminology.url) : false
    );
  }

  static register(terminology: Terminology) {
    this.availableTerminologies.push(terminology);
  }
}

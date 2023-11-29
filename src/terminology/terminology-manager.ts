import { SNOMED } from "./snomed";
import { Terminology } from "./terminology";

export class TerminologyManager {
  private static availableTerminologies: Terminology[] = [new SNOMED()];

  static load(urls: string[]): Terminology[] {
    console.log(`Loading ${urls.length} terminologies ...`);
    return this.availableTerminologies.filter((terminology) =>
      urls.includes(terminology.url)
    );
  }
}

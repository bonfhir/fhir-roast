import { Terminology } from "./terminology";

export class TerminologyManager {
  private availableTerminologies: Terminology[] = [];

  register(terminology: Terminology) {
    this.availableTerminologies.push(terminology);
  }

  unregister(terminology: Terminology) {
    this.availableTerminologies = this.availableTerminologies.filter(
      (t) => t !== terminology
    );
  }
}

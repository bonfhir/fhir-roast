import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyRecord } from "./terminology-record";

// abstract high-level representation of a terminology database
export abstract class TerminologyDatabase {
  abstract read<ReturnType extends Resource>(
    id: string | undefined
  ): ReturnType | undefined;
  abstract search(): CodeableConcept | CodeableConcept[] | undefined;
  // TODO: subsumes
  abstract subsumes(params: unknown): unknown | undefined;
  abstract lookup(coding: Partial<Coding>): CodeableConcept | undefined;

  protected finders: ((
    records: TerminologyRecord[],
    coding: Partial<Coding>
  ) => CodeableConcept | undefined)[];

  constructor() {
    this.finders = [];
  }

  // terminologies

  register(terminology: Terminology): void {
    // batch import
    this.importedRecords(terminology, terminology.import());
    this.finders.push(terminology.finder());
  }

  protected abstract importedRecords(
    terminology: Terminology,
    records: TerminologyRecord[]
  ): void;
}

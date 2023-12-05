import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyRecord } from "./terminology-record";
import { DatabaseInterface, ReadArgs, SubsumesArgs } from "@fhir-roast/core";

// abstract high-level representation of a terminology database
export abstract class TerminologyDatabase implements DatabaseInterface {
  abstract read<ReturnType extends Resource>(
    args: ReadArgs
  ): ReturnType | undefined;
  abstract search(): CodeableConcept | CodeableConcept[] | undefined;
  abstract subsumes(args: Partial<SubsumesArgs>): CodeableConcept | undefined;
  abstract lookup(coding: Partial<Coding>): CodeableConcept | undefined;

  protected finders: ((
    records: TerminologyRecord[],
    coding: Partial<Coding>
  ) => CodeableConcept | undefined)[];

  constructor() {
    this.finders = [];
  }

  abstract start(): Promise<void>;
  abstract stop(): Promise<void>;

  // terminologies
  async register(terminology: Terminology) {
    // batch import
    this.importedRecords(terminology, terminology.import());
    this.finders.push(terminology.finder());
  }

  async unregister(terminology: Terminology) {
    // batch remove
    this.removeRecords(terminology);
    this.finders = this.finders.filter(
      (finder) => finder !== terminology.finder()
    );
  }

  protected abstract importedRecords(
    terminology: Terminology,
    records: TerminologyRecord[]
  ): void;

  protected abstract removeRecords(terminology: Terminology): void;
}

import {
  CodeSystem,
  CodeableConcept,
  Coding,
  Resource,
} from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyRecord } from "./terminology-record";
import { DatabaseInterface, ReadArgs, SubsumesArgs } from "@fhir-roast/core";

// abstract high-level representation of a terminology database
export abstract class TerminologyDatabase implements DatabaseInterface {
  abstract read<ReturnType extends Resource>(
    args: ReadArgs
  ): ReturnType | undefined;
  abstract search<ReturnType extends Resource>():
    | ReturnType
    | ReturnType[]
    | undefined;
  abstract subsumes(args: Partial<SubsumesArgs>): CodeableConcept | undefined;
  abstract lookup(args: Partial<Coding>): CodeableConcept | undefined;

  validateCode(
    args: Partial<Coding | CodeableConcept | CodeSystem>
  ): CodeableConcept | undefined {
    let resourceType: string | undefined, coding: Coding;
    if ("resourceType" in args) {
      resourceType = args.resourceType;
    } else {
      resourceType = "Coding";
    }

    switch (resourceType) {
      case "CodeableConcept":
        const codeableConcept = args as CodeableConcept;
        coding = {
          system: codeableConcept.coding?.[0].system,
          code: codeableConcept.coding?.[0].code,
        };
        return this.lookup(coding);
      case "CodeSystem":
        const codeSystem = args as CodeSystem;
        coding = {
          system: codeSystem.url,
          code: codeSystem.concept?.[0].code,
        };
        return this.lookup(coding);
      case "Coding":
        coding = args as Coding;
        return this.lookup(coding);
      default:
        return undefined;
    }
  }

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
    if (!this.isImported())
      this.importRecords(terminology, terminology.import());

    this.finders.push(terminology.finder());
  }

  async unregister(terminology: Terminology) {
    // batch remove
    this.removeRecords(terminology);
    this.finders = this.finders.filter(
      (finder) => finder !== terminology.finder()
    );
  }

  protected abstract importRecords(
    terminology: Terminology,
    records: TerminologyRecord[]
  ): void;

  protected abstract isImported(): boolean;

  protected abstract removeRecords(terminology: Terminology): void;
}

import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyDatabase } from "./terminology-database";
import { TerminologyRecord } from "./terminology-record";
import { ReadArgs, SubsumesArgs } from "@fhir-roast/core";

export class NaiveDatabase extends TerminologyDatabase {
  private records: TerminologyRecord[];

  constructor() {
    super();
    this.records = [];
  }

  async start() {}
  async stop() {}

  read<ReturnType extends Resource>(args: ReadArgs): ReturnType | undefined {
    throw new Error("Method not implemented.");
  }

  search<ReturnType extends Resource>(): ReturnType | ReturnType[] | undefined {
    throw new Error("Method not implemented.");
  }

  lookup(coding: Partial<Coding>): CodeableConcept | undefined {
    return this.finders
      .map((finder) => finder(this.records, coding))
      .filter(Boolean)[0];
  }

  subsumes(args: Partial<SubsumesArgs>): CodeableConcept | undefined {
    throw new Error("Method not implemented.");
  }

  protected importedRecords(
    terminology: Terminology,
    records: TerminologyRecord[]
  ): void {
    for (let i = 0; i < records.length; i += 10000) {
      const slice = records.slice(i, i + 10000);
      this.records.push(...slice);
    }
    console.log(
      `Imported ${this.records.length} records from ${terminology.name}`
    );
  }

  protected removeRecords(terminology: Terminology): void {
    this.records = this.records.filter(
      (record) => record.system !== terminology.url
    );
  }
}

import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { TerminologyDatabase } from "./terminology-database";
import { TerminologyRecord } from "./terminology-record";
import { Terminology } from "../terminology/terminology";

export class NaiveDatabase extends TerminologyDatabase {
  private records: TerminologyRecord[];

  constructor() {
    super();
    this.records = [];
  }

  read<ReturnType extends Resource>(
    id: string | undefined
  ): ReturnType | undefined {
    throw new Error("Method not implemented.");
  }

  search(): CodeableConcept[] {
    throw new Error("Method not implemented.");
  }

  lookup(coding: Partial<Coding>): CodeableConcept | undefined {
    return this.finders
      .map((finder) => finder(this.records, coding))
      .filter(Boolean)[0];
  }

  subsumes(params: unknown): unknown {
    throw new Error("Method not implemented.");
  }

  importedRecords(
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
}

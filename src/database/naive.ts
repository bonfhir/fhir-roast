import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { TerminologyDatabase } from "./terminology-database";
import { finder } from "./snomed/finder";
import { TerminologyRecord } from "./terminology-record";
import { Terminology } from "../terminology/terminology";

export class NaiveDatabase extends TerminologyDatabase {
  private static instance: TerminologyDatabase;

  public static getDatabase(): TerminologyDatabase {
    if (!NaiveDatabase.instance) {
      NaiveDatabase.instance = new NaiveDatabase();
    }

    return NaiveDatabase.instance;
  }

  public static preload() {
    this.getDatabase();
  }

  static lookup(coding: Partial<Coding>): CodeableConcept | undefined {
    const database = this.getDatabase();
    return database.lookup(coding);
  }

  private records: TerminologyRecord[];

  private constructor() {
    super();
    this.records = [];
  }

  read(): CodeableConcept {
    throw new Error("Method not implemented.");
  }
  search(): CodeableConcept[] {
    throw new Error("Method not implemented.");
  }

  lookup(coding: Partial<Coding>): CodeableConcept | undefined {
    return finder(this.records, coding);
  }

  register(terminology: Terminology): void {
    // batch import
    const records = terminology.import();
    for (let i = 0; i < records.length; i += 10000) {
      const slice = records.slice(i, i + 10000);
      this.records.push(...slice);
    }
    console.log(
      `Imported ${this.records.length} records from ${terminology.name}`
    );
  }
}

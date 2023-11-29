import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { TerminologyDatabase } from "./terminology-database";
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
  private finders: ((
    records: TerminologyRecord[],
    coding: Partial<Coding>
  ) => CodeableConcept | undefined)[];

  private constructor() {
    super();
    this.records = [];
    this.finders = [];
  }

  read(): CodeableConcept {
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

  register(terminology: Terminology): void {
    // batch import
    const records = terminology.import();
    for (let i = 0; i < records.length; i += 10000) {
      const slice = records.slice(i, i + 10000);
      this.records.push(...slice);
    }
    this.finders.push(terminology.finder());
    console.log(
      `Imported ${this.records.length} records from ${terminology.name}`
    );
  }
}

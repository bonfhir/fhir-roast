import { importSNOMEDRecords } from "./snomed/import";
import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { TerminologyDatabase } from "./terminology-database";
import { finder } from "./snomed/finder";
import { TerminologyRecord } from "./terminology-record";

export class NaiveDatabase implements TerminologyDatabase {
  private static instance: TerminologyDatabase;
  private records: TerminologyRecord[] = [];

  public static getDatabase(): TerminologyDatabase {
    if (!NaiveDatabase.instance) {
      NaiveDatabase.instance = new NaiveDatabase();
    }

    return NaiveDatabase.instance;
  }

  private constructor() {
    this.records = importSNOMEDRecords(
      "./data/SNOMED/sct2_Description_Full-en_US1000124_20230301.txt"
    );
    console.log(`Loaded ${this.records.length} records`);
  }

  read(): CodeableConcept {
    throw new Error("Method not implemented.");
  }
  search(): CodeableConcept[] {
    throw new Error("Method not implemented.");
  }

  lookup(coding: Partial<Coding>): CodeableConcept {
    return finder(this.records, coding);
  }

  public static preload() {
    this.getDatabase();
  }

  static lookup(coding: Partial<Coding>): CodeableConcept {
    const database = this.getDatabase();
    return database.lookup(coding);
  }
}

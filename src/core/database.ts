import { SNOMEDRecord, importSNOMEDRecords } from "./snomed/import";

export class Database {
  private static instance: Database;

  records: SNOMEDRecord[];

  private constructor() {
    this.records = importSNOMEDRecords(
      "./data/SNOMED/sct2_Description_Full-en_US1000124_20230301.txt"
    );
    console.log(`Loaded ${this.records.length} records`);
  }

  public static getDatabase(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  lookup(code?: string, system?: string, version?: string) {
    return (this.records ?? []).filter(
      (record) =>
        record.conceptId === code && system === "http://snomed.info/sct"
    )[0];
  }

  public static preload() {
    this.getDatabase();
  }

  static lookup(code?: string, system?: string, version?: string) {
    const database = this.getDatabase();
    return database.lookup(code, system, version);
  }
}

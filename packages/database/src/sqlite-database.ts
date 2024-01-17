import fs from "fs";
import { Database as BunSQLiteDatabase } from "bun:sqlite";
import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyDatabase } from "./terminology-database";
import { TerminologyRecord } from "./terminology-record";
import { ReadArgs, SubsumesArgs } from "@fhir-roast/core";

const ROOT_DB_DIR = "data/db";

export class SQLiteDatabase extends TerminologyDatabase {
  private _database: BunSQLiteDatabase | undefined;

  constructor() {
    super();
  }

  async start() {}
  async stop() {}

  get database(): BunSQLiteDatabase {
    if (!this._database) {
      if (!fs.existsSync(ROOT_DB_DIR)) {
        fs.mkdirSync(ROOT_DB_DIR);
      }

      this._database = new BunSQLiteDatabase("data/db/mydb.sqlite", {
        create: true,
      });
      for (const query of [
        "create table if not exists terminology_records( conceptId text, term text, system text)",
        "create index if not exists terminology_records_conceptId_index on terminology_records(conceptId)",
        "create index if not exists terminology_records_system_index on terminology_records(system)",
      ])
        this.database.query(query).run();
    }
    return this._database;
  }

  read<ReturnType extends Resource>(args: ReadArgs): ReturnType | undefined {
    throw new Error("Method not implemented.");
  }

  search<ReturnType extends Resource>(): ReturnType | ReturnType[] | undefined {
    throw new Error("Method not implemented.");
  }

  subsumes(args: Partial<SubsumesArgs>): CodeableConcept | undefined {
    throw new Error("Method not implemented.");
  }

  lookup(coding: Partial<Coding>): CodeableConcept | undefined {
    const { code, system } = coding;
    if (!code) {
      return undefined;
    }
    if (!system) {
      return undefined;
    }
    const query = this.database.prepare<TerminologyRecord, Array<string>>(
      "select * from terminology_records where conceptId = $conceptId AND system = $system"
    );

    const record = query.get(code, system);
    if (!record) {
      return undefined;
    }

    return {
      coding: [
        {
          system: record.system,
          code: record.conceptId,
          display: record.term,
        },
      ],
      text: record.term,
    };
  }

  protected importRecords(
    terminology: Terminology,
    records: TerminologyRecord[]
  ): void {
    for (let i = 0; i < records.length; i += 10000) {
      const slice = records.slice(i, i + 10000);
      this.insertRecords(slice);
    }
    console.log(
      `Imported ${this.getRecordsCount()} records from ${terminology.name}`
    );
  }

  protected isImported(): boolean {
    // naive approach to import status
    // defer proper mechanism to when data storage design is finalized
    return this.getRecordsCount() > 0;
  }

  private getRecordsCount(): number {
    const query = this.database.query<{ count: number }, Array<never>>(
      "select count(*) as count from terminology_records"
    );
    const record = query.get();
    if (!record) {
      return 0;
    }
    return record.count;
  }

  private insertRecords(records: TerminologyRecord[]): void {
    const query = this.database.prepare(
      "insert into terminology_records (conceptId, term, system) values ($conceptId, $term, $system)"
    );

    const batch = this.database.transaction((recs: TerminologyRecord[]) => {
      for (const record of recs) {
        query.run(record.conceptId, record.term, record.system);
      }
    });

    batch(records);
  }

  protected removeRecords(terminology: Terminology): void {
    if (!terminology.url) {
      return;
    }
    const query = this.database.prepare(
      "delete from terminology_records where system = $system"
    );
    query.run(terminology.url);
  }
}

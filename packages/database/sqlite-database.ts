import { Database as BunSQLiteDatabase } from "bun:sqlite";
import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";
import { TerminologyDatabase } from "./terminology-database";
import { TerminologyRecord } from "./terminology-record";

export class SQLiteDatabase extends TerminologyDatabase {
  private database: BunSQLiteDatabase;

  constructor() {
    super();
    this.database = new BunSQLiteDatabase(":memory:");
    for (const query of [
      "create table terminology_records( conceptId text, term text, system text)",
      "create index terminology_records_conceptId_index on terminology_records(conceptId)",
      "create index terminology_records_system_index on terminology_records(system)",
    ])
      this.database.query(query).run();
  }

  async start() {}
  async stop() {}

  read<ReturnType extends Resource>(
    id: string | undefined
  ): ReturnType | undefined {
    throw new Error("Method not implemented.");
  }

  search(): CodeableConcept | CodeableConcept[] | undefined {
    throw new Error("Method not implemented.");
  }

  subsumes(params: unknown): unknown {
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

  protected importedRecords(
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
}

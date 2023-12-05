import { DatabasePlugin } from "./database-plugin";
import { NaiveDatabase } from "./naive-database";
import { SQLiteDatabase } from "./sqlite-database";
import { TerminologyDatabase } from "./terminology-database";
import { type TerminologyRecord } from "./terminology-record";
export {
  DatabasePlugin,
  NaiveDatabase,
  SQLiteDatabase,
  TerminologyDatabase,
  type TerminologyRecord,
};
export default DatabasePlugin;

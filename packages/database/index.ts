import { DatabasePlugin } from "./src/database-plugin";
import { NaiveDatabase } from "./src/naive-database";
import { SQLiteDatabase } from "./src/sqlite-database";
import { TerminologyDatabase } from "./src/terminology-database";
import { type TerminologyRecord } from "./src/terminology-record";
export {
  DatabasePlugin,
  NaiveDatabase,
  SQLiteDatabase,
  TerminologyDatabase,
  type TerminologyRecord,
};
export default DatabasePlugin;

import { Database as SQLiteDatabase } from "bun:sqlite";

const db = new SQLiteDatabase(":memory:");
const query = db.query("select 'Hello world' as message;");
query.get(); // => { message: "Hello world" }

import { readFileSync } from "fs";
import { TerminologyRecord } from "../terminology-record";

export function importSNOMEDRecords(filePath: string): TerminologyRecord[] {
  const file = readFileSync(filePath, "utf8");

  let records: TerminologyRecord[] = [];
  let lineNumber = 0;

  for (const line of file.split("\n")) {
    ++lineNumber;
    // first line is headers
    if (lineNumber === 1) {
      continue;
    }

    const splittedLined = line.split("\t");
    const conceptId = splittedLined[4];
    const term = splittedLined[7];
    const system = "http://snomed.info/sct";

    records.push({ conceptId, term, system });
  }

  return records;
}

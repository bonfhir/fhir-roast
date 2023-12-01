import { readFileSync } from "fs";
import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { TerminologyRecord } from "@fhir-roast/database";
import { Terminology } from "@fhir-roast/terminology";

export const SNOMED_CT_URL = "http://snomed.info/sct";

export class SNOMED extends Terminology {
  constructor() {
    super("SNOMED CT", "2020-03-01", SNOMED_CT_URL);
  }

  import(): TerminologyRecord[] {
    console.log("Importing SNOMED ...");
    return importRecords(
      "./data/SNOMED/sct2_Description_Full-en_US1000124_20230301.txt"
    );
  }

  finder(): (
    records: TerminologyRecord[],
    coding: Partial<Coding>
  ) => CodeableConcept | undefined {
    return finder;
  }
}

export function importRecords(filePath: string): TerminologyRecord[] {
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
    const system = SNOMED_CT_URL;

    records.push({ conceptId, term, system });
  }

  return records;
}

export function finder(
  records: TerminologyRecord[],
  coding: Partial<Coding>
): CodeableConcept | undefined {
  const { code, system, version } = coding;
  const record = (records ?? []).filter(
    (record) => record.conceptId === code && system === SNOMED_CT_URL
  )[0];
  if (!record) {
    return undefined;
  }
  return {
    coding: [
      {
        system: SNOMED_CT_URL,
        code: record.conceptId,
        display: record.term,
        ...(version ? { version } : {}),
      },
    ],
    display: record.term,
  } as CodeableConcept;
}

import { importSNOMEDRecords } from "../database/snomed/import";
import { TerminologyRecord } from "../database/terminology-record";
import { Terminology } from "./terminology";

export class SNOMED extends Terminology {
  constructor() {
    super("SNOMED CT", "2020-03-01", "http://snomed.info/sct");
  }

  import(): TerminologyRecord[] {
    console.log("Importing SNOMED ...");
    return importSNOMEDRecords(
      "./data/SNOMED/sct2_Description_Full-en_US1000124_20230301.txt"
    );
  }
}

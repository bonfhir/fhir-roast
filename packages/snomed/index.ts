import { TerminologyManager } from "@fhir-roast/terminology";
import { SNOMED } from "./snomed";
export { SNOMED };

TerminologyManager.register(new SNOMED());

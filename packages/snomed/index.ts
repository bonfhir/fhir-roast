import { TerminologyManager } from "fhir-roast-terminology/terminology-manager";
import { SNOMED } from "./snomed";
export { SNOMED };

TerminologyManager.register(new SNOMED());

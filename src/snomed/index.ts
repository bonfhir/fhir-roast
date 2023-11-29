import { TerminologyManager } from "../terminology/terminology-manager";
import { SNOMED } from "./snomed";

TerminologyManager.register(new SNOMED());

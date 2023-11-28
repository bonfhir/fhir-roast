import { CodeableConcept, Coding } from "@bonfhir/core/r5";

// abstract high-level representation of a terminology database
export interface TerminologyDatabase {
  read(): CodeableConcept;
  search(): CodeableConcept[];
  lookup(coding: Partial<Coding>): CodeableConcept;
}

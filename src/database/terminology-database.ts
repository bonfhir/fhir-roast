import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { Terminology } from "../terminology/terminology";

// abstract high-level representation of a terminology database
export abstract class TerminologyDatabase {
  abstract read(): CodeableConcept | undefined;
  abstract search(): CodeableConcept | CodeableConcept[] | undefined;
  // TODO: subsumes
  abstract subsumes(params: unknown): unknown | undefined;
  abstract lookup(coding: Partial<Coding>): CodeableConcept | undefined;

  // terminologies
  abstract register(terminology: Terminology): void;
}

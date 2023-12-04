import { CodeableConcept, Coding } from "@bonfhir/core/r5";

type ReadArgs = {
  id: string;
};

type SubsumesArgs = {
  codeA: string;
  codeB: string;
  system: string;
  version: string;
};

export interface DatabaseInterface {
  read<T>(args: Partial<ReadArgs>): T | undefined;
  lookup: (args: Partial<Coding>) => CodeableConcept | undefined;
  subsumes: (args: Partial<SubsumesArgs>) => CodeableConcept | undefined;
}

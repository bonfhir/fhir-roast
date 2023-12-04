import { CodeableConcept, Coding, Resource } from "@bonfhir/core/r5";

export type ReadArgs = {
  id: string;
};

export type SubsumesArgs = {
  codeA: string;
  codeB: string;
  system: string;
  version: string;
};

export interface DatabaseInterface {
  read<ReturnType extends Resource>(
    args: Partial<ReadArgs>
  ): ReturnType | undefined;
  lookup: (args: Partial<Coding>) => CodeableConcept | undefined;
  subsumes: (args: Partial<SubsumesArgs>) => CodeableConcept | undefined;
}

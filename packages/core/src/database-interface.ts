import {
  CodeSystem,
  CodeableConcept,
  Coding,
  Resource,
} from "@bonfhir/core/r5";
import { Terminology } from "@fhir-roast/terminology";

export type ReadArgs = {
  id: string;
};

export type SubsumesArgs = {
  codeA: string;
  codeB: string;
  system: string;
  version: string;
};

export type SearchArgs = {
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
};

export interface DatabaseInterface {
  read<ReturnType extends Resource>(
    args: Partial<ReadArgs>
  ): ReturnType | undefined;
  search<ReturnType extends Resource>(
    args: Partial<SearchArgs>
  ): ReturnType | ReturnType[] | undefined;
  lookup: (args: Partial<Coding>) => CodeableConcept | undefined;
  validateCode: (
    args: Partial<Coding | CodeableConcept | CodeSystem>
  ) => CodeableConcept | undefined;
  subsumes: (args: Partial<SubsumesArgs>) => CodeableConcept | undefined;

  register(terminology: Terminology): Promise<void>;
  unregister(terminology: Terminology): Promise<void>;
}

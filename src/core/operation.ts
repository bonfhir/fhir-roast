import { Parameters } from "@bonfhir/core/r5";

export type CodeSystemLookupOperation = {
  code: Parameters;
  system: Parameters;
  version: Parameters;
};

export type CodeSystemValidateCodeOperation = {
  code: Parameters;
  system: Parameters;
  version: Parameters;
  display: Parameters;
};

export type CodeSystemSubsumesOperation = {
  codeA: Parameters;
  codeB: Parameters;
  system: Parameters;
  version: Parameters;
};

export type ValueSetExpandOperation = {
  url: Parameters;
  filter: Parameters;
  offset: Parameters;
  count: Parameters;
};

export type ValueSetValidateCodeOperation = {
  url: Parameters;
  code: Parameters;
  system: Parameters;
  systemVersion: Parameters;
  display: Parameters;
};

export type ConceptMapTranslateOperation = {
  url: Parameters;
  sourceCode: Parameters;
  system: Parameters;
  targetCode: Parameters;
  targetSystem: Parameters;
};

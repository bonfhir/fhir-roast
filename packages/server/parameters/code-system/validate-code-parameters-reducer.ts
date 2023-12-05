import {
  CodeSystem,
  CodeableConcept,
  Coding,
  Parameters,
  ParametersParameter,
} from "@bonfhir/core/r5";

export function validateCodeReducer(
  acc: any,
  parameter: ParametersParameter
): Partial<CodeSystemValidateCodeInputParameters> {
  if (parameter.name === "url") {
    return { ...acc, url: parameter.valueUri };
  }
  if (parameter.name === "codeSystem") {
    // TODO: we must parse the CodeSystem resource
    return { ...acc, codeSystem: { code: parameter.valueCode } };
  }
  if (parameter.name === "code") {
    return { ...acc, code: parameter.valueCode };
  }
  if (parameter.name === "version") {
    return { ...acc, version: parameter.valueString };
  }
  if (parameter.name === "display") {
    return { ...acc, display: parameter.valueString };
  }
  if (parameter.name === "coding") {
    // TODO: we must parse the Coding resource
    return { ...acc, coding: { code: parameter.valueCode } };
  }
  if (parameter.name === "codeableConcept") {
    // TODO: we must parse the CodeableConcept resource
    return { ...acc, codeableConcept: { code: parameter.valueCode } };
  }
  if (parameter.name === "date") {
    return { ...acc, date: parameter.valueDateTime };
  }
  if (parameter.name === "abstract") {
    return { ...acc, abstract: parameter.valueBoolean };
  }
  if (parameter.name === "displayLanguage") {
    return { ...acc, displayLanguage: parameter.valueCode };
  }
  return acc;
}

type CodeSystemValidateCodeInputParameters = {
  url: string;
  codeSystem: CodeSystem;
  code: string;
  version: string;
  display: string;
  coding: Coding;
  codeableConcept: CodeableConcept;
  date: string;
  abstract: boolean;
  displayLanguage: string;
};

export function validateCodeParametersReducer(
  parameters: Parameters | undefined
): Partial<CodeSystemValidateCodeInputParameters> {
  return (parameters?.parameter ?? []).reduce(validateCodeReducer, {
    url: undefined,
    codeSystem: undefined,
    code: undefined,
    version: undefined,
    display: undefined,
    coding: undefined,
    codeableConcept: undefined,
    date: undefined,
    abstract: undefined,
    displayLanguage: undefined,
  });
}

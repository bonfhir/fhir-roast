import { Parameters, ParametersParameter } from "@bonfhir/core/r5";

const subsumesReducer = (
  acc: any,
  parameter: ParametersParameter
): Partial<{
  codeA: string;
  codeB: string;
  system: string;
  version: string;
}> => {
  if (parameter.name === "codeA") {
    return { ...acc, codeA: parameter.valueCode };
  }
  if (parameter.name === "codeB") {
    return { ...acc, codeB: parameter.valueCode };
  }
  if (parameter.name === "system") {
    return { ...acc, system: parameter.valueUri };
  }
  if (parameter.name === "version") {
    return { ...acc, version: parameter.valueString };
  }
  return acc;
};

export function subsumesParametersReducer(
  parameters: Parameters | undefined
): Partial<{ codeA: string; codeB: string; system: string; version: string }> {
  return (parameters?.parameter ?? []).reduce(subsumesReducer, {
    codeA: "",
    codeB: "",
    system: "",
    version: "",
  });
}

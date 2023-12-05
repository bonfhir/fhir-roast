import { Coding, Parameters, ParametersParameter } from "@bonfhir/core/r5";

const lookupReducer = (
  acc: any,
  parameter: ParametersParameter
): Partial<Coding> => {
  if (parameter.name === "code") {
    return { ...acc, code: parameter.valueCode };
  }
  if (parameter.name === "system") {
    return { ...acc, system: parameter.valueUri };
  }
  if (parameter.name === "version") {
    return { ...acc, version: parameter.valueString };
  }
  return acc;
};

export function lookupParametersReducer(
  parameters: Parameters | undefined
): Partial<Coding> {
  return (parameters?.parameter ?? []).reduce(lookupReducer, {
    code: "",
    system: "",
    version: "",
  });
}

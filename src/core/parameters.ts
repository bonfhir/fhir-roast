import { Parameters, ParametersParameter } from "@bonfhir/core/r5";

const reducer = (acc: any, parameter: ParametersParameter) => {
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

export function parametersReducer(parameters: Parameters | undefined) {
  return (parameters?.parameter ?? []).reduce(reducer, {
    code: "",
    system: "",
    version: "",
  });
}

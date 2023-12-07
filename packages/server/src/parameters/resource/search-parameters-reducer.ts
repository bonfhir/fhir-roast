import { Parameters, ParametersParameter } from "@bonfhir/core/r5";

const searchReducer = (
  acc: any,
  parameter: ParametersParameter
): Partial<{
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
}> => {
  if (parameter.name === "url") {
    return { ...acc, url: parameter.valueUri };
  }
  if (parameter.name === "version") {
    return { ...acc, version: parameter.valueString };
  }
  if (parameter.name === "name") {
    return { ...acc, name: parameter.valueString };
  }
  if (parameter.name === "title") {
    return { ...acc, title: parameter.valueString };
  }
  if (parameter.name === "status") {
    return { ...acc, status: parameter.valueString };
  }
  return acc;
};

export function searchParametersReducer(
  parameters: Parameters | undefined
): Partial<{
  url: string;
  version: string;
  name: string;
  title: string;
  status: string;
}> {
  return (parameters?.parameter ?? []).reduce(searchReducer, {
    url: "",
    version: "",
    name: "",
    title: "",
    status: "",
  });
}

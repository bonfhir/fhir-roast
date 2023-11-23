import { Operation, OperationOutcome } from "@bonfhir/core/r5";
import { Parameters } from "@bonfhir/core/r5";

export interface CodeSystemLookupOperation extends Operation {
  parameters:
    | {
        resourceType: "Parameters";
        parameter: [
          {
            name: "code";
            valueCode: string;
          },
          {
            name: "system";
            valueUri: string;
          },
          {
            name: "version";
            valueString: string;
          }
        ];
      }
    | Parameters;
}
export type CodeSystemLookupOperationParameters =
  CodeSystemLookupOperation["parameters"];

const reducer = (acc: any, parameter: any) => {
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

export function lookup(
  parameters: CodeSystemLookupOperationParameters
): Promise<Parameters | OperationOutcome> {
  const { code, system, version } = (parameters.parameter ?? []).reduce(
    reducer,
    {
      code: "",
      system: "",
      version: "",
    }
  );
  return Promise.resolve({
    resourceType: "Parameters",
    parameter: [
      {
        name: "name",
        valueString: "LOINC",
      },
      {
        name: "version",
        valueString: "2.48",
      },
      {
        name: "display",
        valueString: "Bicarbonate [Moles/volume] in Serum",
      },
      {
        name: "abstract",
        valueString: "false",
      },
      {
        name: "designation",
        part: [
          {
            name: "value",
            valueString: "Bicarbonate [Moles/volume] in Serum",
          },
        ],
      },
    ],
  });
}

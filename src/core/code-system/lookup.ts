import {
  Operation,
  OperationOutcome,
  ParametersParameter,
} from "@bonfhir/core/r5";
import { Parameters } from "@bonfhir/core/r5";
import { Database } from "../database";

export interface CodeSystemLookupOperation extends Operation {
  parameters?:
    | {
        resourceType: "Parameters";
        parameter:
          | [
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
            ]
          | ParametersParameter[];
      }
    | Parameters;
}

export type CodeSystemLookupOperationParameters =
  | CodeSystemLookupOperation["parameters"];

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
  const { code, system, version } = (parameters?.parameter ?? []).reduce(
    reducer,
    {
      code: "",
      system: "",
      version: "",
    }
  );

  const record = Database.lookup(code, system, version);

  if (!record) {
    return Promise.resolve({
      resourceType: "OperationOutcome",
      issue: [
        {
          severity: "error",
          code: "not-found",
          diagnostics: `Code ${code} not found`,
        },
      ],
    });
  }

  return Promise.resolve({
    resourceType: "Parameters",
    parameter: [
      {
        name: "name",
        valueString: "SNOMED CT",
      },
      {
        name: "version",
        valueString: "1000124_20230301",
      },
      {
        name: "display",
        valueString: record.term,
      },
    ],
  });
}

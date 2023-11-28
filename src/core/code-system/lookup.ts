import {
  Operation,
  OperationOutcome,
  ParametersParameter,
} from "@bonfhir/core/r5";
import { Parameters } from "@bonfhir/core/r5";
import { NaiveDatabase } from "../../database";
import { parametersReducer } from "../parameters";

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

export function lookup(
  parameters: CodeSystemLookupOperationParameters
): Promise<Parameters | OperationOutcome> {
  const { code, system, version } = parametersReducer(parameters);

  const concept = NaiveDatabase.lookup({ code, system, version });

  if (!concept) {
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
        valueString: concept.coding![0].display,
      },
      {
        name: "version",
        valueString: concept.coding![0].version,
      },
      {
        name: "display",
        valueString: concept.coding![0].code,
      },
    ],
  });
}

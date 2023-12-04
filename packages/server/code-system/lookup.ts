import {
  CodeableConcept,
  Operation,
  OperationOutcome,
  Parameters,
  ParametersParameter,
} from "@bonfhir/core/r5";
import { lookupParametersReducer } from "../parameters";
import { type DatabaseInterface } from "@fhir-roast/core";

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
  database: DatabaseInterface | undefined,
  parameters: CodeSystemLookupOperationParameters
): Promise<Parameters | OperationOutcome> {
  if (!database) {
    throw new Error("Database not found");
  }

  const { code, system, version } = lookupParametersReducer(parameters);
  const concept: CodeableConcept | undefined = database.lookup({
    code,
    system,
    version,
  });

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

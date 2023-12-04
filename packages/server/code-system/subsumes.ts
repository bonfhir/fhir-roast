import {
  Operation,
  OperationOutcome,
  Parameters,
  ParametersParameter,
} from "@bonfhir/core/r5";
import { TerminologyDatabase } from "@fhir-roast/database";
import { subsumesParametersReducer } from "../parameters";

export interface CodeSystemSubsumesOperation extends Operation {
  parameters?:
    | {
        resourceType: "Parameters";
        parameter:
          | [
              {
                name: "codeA";
                valueCode: string;
              },
              {
                name: "codeB";
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

export type CodeSystemSubsumesOperationParameters =
  | CodeSystemSubsumesOperation["parameters"];

export function subsumes(
  database: TerminologyDatabase,
  parameters: CodeSystemSubsumesOperationParameters
): Promise<Parameters | OperationOutcome> {
  // TODO: Implement subsumes
  const { codeA, codeB, system, version } =
    subsumesParametersReducer(parameters);
  const concept = database.subsumes({ codeA, codeB, system, version });

  if (!concept) {
    // TODO
    return Promise.resolve({
      resourceType: "OperationOutcome",
      issue: [
        {
          severity: "error",
          code: "not-found",
          diagnostics: `Code ${codeA} not found`,
        },
      ],
    });
  }

  // TODO
  return Promise.resolve({
    resourceType: "Parameters",
    parameter: [],
  });
}

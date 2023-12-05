import {
  CodeSystem,
  CodeableConcept,
  Coding,
  Operation,
  OperationOutcome,
  Parameters,
  ParametersParameter,
} from "@bonfhir/core/r5";
import { DatabaseInterface } from "@fhir-roast/core";
import { validateCodeParametersReducer } from "../parameters";
import { test } from "bun:test";

export interface CodeSystemValidateCodeOperation extends Operation {
  parameters?:
    | {
        resourceType: "Parameters";
        parameter:
          | [
              {
                name: "url";
                valueUri: string;
              },
              {
                name: "codeSystem";
                valueCodeSystem: CodeSystem;
              },
              {
                name: "code";
                valueCode: string;
              },
              {
                name: "version";
                valueString: string;
              },
              {
                name: "display";
                valueString: string;
              },
              {
                name: "coding";
                valueCoding: Coding;
              },
              {
                name: "codeableConcept";
                valueCodeableConcept: CodeableConcept;
              },
              {
                name: "date";
                valueDateTime: string;
              },
              {
                name: "abstract";
                valueBoolean: boolean;
              },
              {
                name: "displayLanguage";
                valueCode: string;
              }
            ]
          | ParametersParameter[];
      }
    | Parameters;
}

export type CodeSystemValidateCodeOperationParameters =
  | CodeSystemValidateCodeOperation["parameters"];

export function validateCode(
  database: DatabaseInterface | undefined,
  parameters: CodeSystemValidateCodeOperationParameters
): Promise<Parameters | OperationOutcome> {
  if (!database) {
    throw new Error("Database not found");
  }

  const {
    url,
    // codeSystem, // TODO
    code,
    version,
    display,
    // coding, // TODO
    // codeableConcept, // TODO
    // date, // TODO
    // abstract, // TODO
    // displayLanguage, // TODO
  } = validateCodeParametersReducer(parameters);
  const concept: CodeableConcept | undefined = database.validateCode({
    code,
    system: url,
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

  const { result, message, issues } = validator(concept, {
    text: display,
    coding: [
      {
        code,
        system: url,
        version,
        display,
      },
    ],
  });
  return Promise.resolve({
    resourceType: "Parameters",
    parameter: [
      {
        name: "result",
        valueBoolean: result,
      },
      {
        name: "message",
        valueString: message,
      },
      {
        name: "display",
        valueString: concept.coding?.[0]?.display,
      },
      {
        name: "code",
        valueCode: concept.coding?.[0]?.code,
      },
      {
        name: "system",
        valueUri: concept?.coding?.[0]?.system,
      },
      {
        name: "version",
        valueString: concept?.coding?.[0]?.version,
      },
      {
        name: "codeableConcept",
        valueCodeableConcept: concept,
      },
      // ...(issues.length > 0
      //   ? {
      //       name: "issues",
      //       valueOperationOutcome: <OperationOutcome>{},
      //     }
      //   : {}),
    ],
  });
}

// TODO: Implement validator
const validator = (
  referenceConcept: CodeableConcept,
  testedConcept: Partial<CodeableConcept>
): { result: boolean; message: string; issues: string[] } => {
  let result = referenceConcept === testedConcept;
  if (result) {
    return { result, message: "", issues: [] };
  }
  result =
    referenceConcept &&
    testedConcept &&
    referenceConcept.coding &&
    testedConcept.coding &&
    referenceConcept.coding[0].code === testedConcept.coding[0].code &&
    referenceConcept.coding[0].system === testedConcept.coding[0].system
      ? true
      : false;

  const issues: string[] = [];
  const message: string = "";
  return { result, message, issues };
};

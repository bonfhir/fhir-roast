import { Operation } from "@bonfhir/core/r5";

export interface CodeSystemValidateCodeOperation extends Operation {
  parameters: {
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
      },
      {
        name: "display";
        valueString: string;
      }
    ];
  };
}

export const validateCode = () => {};

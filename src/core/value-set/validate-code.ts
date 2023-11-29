import { Operation } from "@bonfhir/core/r5";

export interface ValueSetValidateCodeOperation extends Operation {
  parameters: {
    resourceType: "Parameters";
    parameter: [
      {
        name: "url";
        valueUri: string;
      },
      {
        name: "code";
        valueCode: string;
      },
      {
        name: "system";
        valueUri: string;
      },
      {
        name: "systemVersion";
        valueString: string;
      },
      {
        name: "display";
        valueString: string;
      }
    ];
  };
}

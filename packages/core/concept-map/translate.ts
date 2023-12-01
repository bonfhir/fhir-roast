import { Operation } from "@bonfhir/core/r5";

export interface ConceptMapTranslateOperation extends Operation {
  parameters: {
    resourceType: "Parameters";
    parameter: [
      {
        name: "url";
        valueUri: string;
      },
      {
        name: "sourceCode";
        valueCode: string;
      },
      {
        name: "system";
        valueUri: string;
      },
      {
        name: "targetCode";
        valueCode: string;
      },
      {
        name: "targetSystem";
        valueUri: string;
      }
    ];
  };
}

export const translate = () => {};

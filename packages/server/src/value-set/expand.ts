import { Operation } from "@bonfhir/core/r5";

export interface ValueSetExpandOperation extends Operation {
  parameters: {
    resourceType: "Parameters";
    parameter: [
      {
        name: "url";
        valueUri: string;
      },
      {
        name: "filter";
        valueString: string;
      },
      {
        name: "offset";
        valueInteger: number;
      },
      {
        name: "count";
        valueInteger: number;
      }
    ];
  };
}

export const expand = () => {};

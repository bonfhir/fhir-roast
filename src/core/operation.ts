import { Operation } from "@bonfhir/core/r5";

export interface CodeSystemLookupOperation extends Operation {
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
      }
    ];
  };
}

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

export interface CodeSystemSubsumesOperation extends Operation {
  parameters: {
    resourceType: "Parameters";
    parameter: [
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
    ];
  };
}

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

import { CapabilityStatement } from "@bonfhir/core/r5";
import { narrative } from "@bonfhir/core/r5";

// TODO: we'll probably want to keep this updated with respect to the implementation

export const capabilityStatement: CapabilityStatement = {
  resourceType: "CapabilityStatement",
  id: "fhir-roast-terminology-server",
  url: "http://hl7.org/fhir/CapabilityStatement/terminology-server",
  version: "5.0.0",
  name: "FHIRRoastTerminologyServiceCapabilityStatement",
  title: "FHIR Roast Terminology Service — Capability Statement",
  status: "draft",
  experimental: true,
  date: "2023-11-23",
  description: "FHIR Roast is a bare-bone Terminology Server.",
  kind: "instance",
  implementation: {
    description: "The FHIR Roast Terminology Server",
  },
  fhirVersion: "5.0.0",
  format: ["json", "xml"],
  rest: [
    {
      mode: "server",
      resource: [
        {
          type: "CodeSystem",
          profile: "http://hl7.org/fhir/StructureDefinition/CodeSystem",
          interaction: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "read",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "search-type",
            },
          ],
          searchParam: [
            {
              name: "url",
              definition: "http://hl7.org/fhir/SearchParameter/CodeSystem-url",
              type: "uri",
            },
            {
              name: "version",
              definition:
                "http://hl7.org/fhir/SearchParameter/CodeSystem-version",
              type: "token",
            },
            {
              name: "name",
              definition: "http://hl7.org/fhir/SearchParameter/CodeSystem-name",
              type: "string",
            },
            {
              name: "title",
              definition:
                "http://hl7.org/fhir/SearchParameter/CodeSystem-title",
              type: "string",
            },
            {
              name: "status",
              definition:
                "http://hl7.org/fhir/SearchParameter/CodeSystem-status",
              type: "token",
            },
          ],
          operation: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/CodeSystem-lookup",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/CodeSystem-validate-code",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/CodeSystem-subsumes",
            },
          ],
        },
        {
          type: "ValueSet",
          profile: "http://hl7.org/fhir/StructureDefinition/ValueSet",
          interaction: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "read",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "search-type",
            },
          ],
          searchParam: [
            {
              name: "url",
              definition: "http://hl7.org/fhir/SearchParameter/ValueSet-url",
              type: "uri",
            },
            {
              name: "version",
              definition:
                "http://hl7.org/fhir/SearchParameter/ValueSet-version",
              type: "token",
            },
            {
              name: "name",
              definition: "http://hl7.org/fhir/SearchParameter/ValueSet-name",
              type: "string",
            },
            {
              name: "title",
              definition: "http://hl7.org/fhir/SearchParameter/ValueSet-title",
              type: "string",
            },
            {
              name: "status",
              definition: "http://hl7.org/fhir/SearchParameter/ValueSet-status",
              type: "token",
            },
          ],
          operation: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/ValueSet-expand",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/ValueSet-validate-code",
            },
          ],
        },
        {
          type: "ConceptMap",
          profile: "http://hl7.org/fhir/StructureDefinition/ConceptMap",
          interaction: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "read",
            },
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              code: "search-type",
            },
          ],
          searchParam: [
            {
              name: "url",
              definition: "http://hl7.org/fhir/SearchParameter/ConceptMap-url",
              type: "uri",
            },
            {
              name: "version",
              definition:
                "http://hl7.org/fhir/SearchParameter/ConceptMap-version",
              type: "token",
            },
            {
              name: "name",
              definition: "http://hl7.org/fhir/SearchParameter/ConceptMap-name",
              type: "string",
            },
            {
              name: "title",
              definition:
                "http://hl7.org/fhir/SearchParameter/ConceptMap-title",
              type: "string",
            },
            {
              name: "status",
              definition:
                "http://hl7.org/fhir/SearchParameter/ConceptMap-status",
              type: "token",
            },
          ],
          operation: [
            {
              extension: [
                {
                  url: "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation",
                  valueCode: "SHALL",
                },
              ],
              name: "expand",
              definition:
                "http://hl7.org/fhir/OperationDefinition/ConceptMap-translate",
            },
          ],
        },
      ],
    },
  ],
};

capabilityStatement.text = narrative(capabilityStatement);

import { CapabilityStatement } from "@bonfhir/core/r5";

export const capabilityStatement: CapabilityStatement = {
  resourceType: "CapabilityStatement",
  id: "fhir-roast-terminology-server",
  text: {
    status: "extensions",
    div: '<div xmlns="http://www.w3.org/1999/xhtml">\n      <h2>ACMETerminologyServiceCapabilityStatement</h2>\n      <div>\n        <p>Example capability statement for a Terminology Server. A server can support more fucntionality than defined here, but this is the minimum amount</p>\n\n      </div>\n      <table>\n        <tr>\n          <td>Mode</td>\n          <td>SERVER</td>\n        </tr>\n        <tr>\n          <td>Description</td>\n          <td/>\n        </tr>\n        <tr>\n          <td>Transaction</td>\n          <td/>\n        </tr>\n        <tr>\n          <td>System History</td>\n          <td/>\n        </tr>\n        <tr>\n          <td>System Search</td>\n          <td/>\n        </tr>\n      </table>\n      <table>\n        <tr>\n          <th>\n            <b>Resource Type</b>\n          </th>\n          <th>\n            <b>Profile</b>\n          </th>\n          <th>\n            <b title="GET a resource (read interaction)">Read</b>\n          </th>\n          <th>\n            <b title="GET all set of resources of the type (search interaction)">Search</b>\n          </th>\n          <th>\n            <b title="PUT a new resource version (update interaction)">Update</b>\n          </th>\n          <th>\n            <b title="POST a new resource (create interaction)">Create</b>\n          </th>\n        </tr>\n        <tr>\n          <td>CodeSystem</td>\n          <td>\n            <a href="http://hl7.org/fhir/StructureDefinition/CodeSystem">http://hl7.org/fhir/StructureDefinition/CodeSystem</a>\n          </td>\n          <td>y</td>\n          <td>y</td>\n          <td/>\n          <td/>\n        </tr>\n        <tr>\n          <td>ValueSet</td>\n          <td>\n            <a href="http://hl7.org/fhir/StructureDefinition/ValueSet">http://hl7.org/fhir/StructureDefinition/ValueSet</a>\n          </td>\n          <td>y</td>\n          <td>y</td>\n          <td/>\n          <td/>\n        </tr>\n        <tr>\n          <td>ConceptMap</td>\n          <td>\n            <a href="http://hl7.org/fhir/StructureDefinition/ConceptMap">http://hl7.org/fhir/StructureDefinition/ConceptMap</a>\n          </td>\n          <td>y</td>\n          <td>y</td>\n          <td/>\n          <td/>\n        </tr>\n      </table>\n    </div>',
  },
  url: "http://hl7.org/fhir/CapabilityStatement/terminology-server",
  version: "5.0.0",
  name: "ACMETerminologyServiceCapabilityStatement",
  title: "ACME Terminology Service — Capability Statement",
  status: "draft",
  experimental: true,
  date: "2022-09-01",
  description:
    "Example capability statement for a Terminology Server. A server can support more functionality than defined here, but this is the minimum amount",
  kind: "instance",
  implementation: {
    description: "The ACME FHIR Terminology Server",
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
# FHIR Roast

FHIR Roast is a bare-bones FHIR Terminology Service written in TypeScript. Is is intended to be used as a building block for applications requiring a FHIR Terminology Service. It's main driving philosophy is to be extensible such as to be easily modified by developers to suit their needs.

- It should be developed using a plugin architecture and easy to extend.
- It should be easy to add new terminologies or code systems.
- It should have fast lookups and be read optimized to be used in data ingestion processes.

## FHIR

FHIR is a standard for exchanging healthcare information electronically. It is a standard that is developed by HL7 and is used by many healthcare organizations around the world. For more information, see [FHIR](https://www.hl7.org/fhir/).

## FHIR Terminology Service

A FHIR Terminology Service is a server that provides access to terminology content. It is a server that implements the FHIR Terminology Service specification. For more information, see [FHIR Terminology Service](https://build.fhir.org/terminology-service.html).

## Getting Started

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.0.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Installing Terminologies

### SNOMED CT

You can acquire a copy of the SNOMED CT US Edition or International Edition from the National Library of Medicine:

- https://www.nlm.nih.gov/healthit/snomedct/us_edition.html
- https://www.nlm.nih.gov/healthit/snomedct/international.html

Extract the content of the archive into the `data/SNOMED` directory.

The SNOMED CT terminology will be auto-loaded by the SNOMED plugin.

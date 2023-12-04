# FHIR Roast

FHIR Roast is a bare-bones FHIR server written in TypeScript. Is is intended to be used as a building block for applications requiring a FHIR Terminology Server. It's main driving philosophy is to be extensible such as to be easily modified by developers to suit their needs.

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

Ensure the entry point script registers the SNOMED CT terminology:

```typescript
...
import "@fhir-roast/snomed";
...
const terminologies = TerminologyManager.load(["http://snomed.info/sct"]);
...
server.register(terminologies);
...
```

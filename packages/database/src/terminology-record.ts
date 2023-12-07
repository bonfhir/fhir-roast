import { TerminologyRecordInterface } from "@fhir-roast/core";

export abstract class TerminologyRecord implements TerminologyRecordInterface {
  abstract readonly conceptId: string;
  abstract readonly term: string;
  abstract readonly system: string;
}

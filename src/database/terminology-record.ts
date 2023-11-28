// TODO: this is SNOMED for now, but should be a generic terminology model
export interface TerminologyRecord {
  readonly conceptId: string;
  readonly term: string;
  readonly system: string;
}

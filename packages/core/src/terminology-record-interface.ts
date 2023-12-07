// TODO: this is SNOMED for now, but should be a generic terminology model
// TODO: consider hierarchy between concepts
// TODO: consider relationships between concepts
// TODO: consider translation rules between terminologies
export interface TerminologyRecordInterface {
  readonly conceptId: string;
  readonly term: string;
  readonly system: string;
}

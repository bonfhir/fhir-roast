import { CodeableConcept, Coding } from "@bonfhir/core/r5";
import { TerminologyRecord } from "../terminology-record";

export function finder<T extends TerminologyRecord>(
  records: T[],
  coding: Partial<Coding>
): CodeableConcept | undefined {
  const { code, system, version } = coding;
  const record = (records ?? []).filter(
    (record) => record.conceptId === code && system === "http://snomed.info/sct"
  )[0];
  if (!record) {
    return undefined;
  }
  return {
    coding: [
      {
        system: "http://snomed.info/sct",
        code: record.conceptId,
        display: record.term,
        ...(version ? { version } : {}),
      },
    ],
    display: record.term,
  } as CodeableConcept;
}

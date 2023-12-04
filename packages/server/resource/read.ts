import { Resource } from "@bonfhir/core/r5";
import { TerminologyDatabase } from "@fhir-roast/database";

export function read<ReturnType extends Resource>(
  database: TerminologyDatabase,
  id: string | undefined
): Promise<ReturnType | undefined> {
  // TODO: some resources will not be in the database
  const resource = database.read<ReturnType>(id);

  if (!resource) {
    return Promise.resolve(undefined);
  }

  return Promise.resolve(resource);
}

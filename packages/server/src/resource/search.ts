import { Resource, Parameters } from "@bonfhir/core/r5";
import { type DatabaseInterface } from "@fhir-roast/core";
import { searchParametersReducer } from "../parameters";

export function search<ReturnType extends Resource>(
  database: DatabaseInterface | undefined,
  parameters: Parameters
): Promise<ReturnType | ReturnType[] | undefined> {
  if (!database) {
    throw new Error("Database not found");
  }

  const { url, version, name, title, status } =
    searchParametersReducer(parameters);

  // TODO: some resources will not be in the database, and will exist in memory or on the file system
  const resource = database.search<ReturnType>({
    url,
    version,
    name,
    title,
    status,
  });

  if (!resource) {
    return Promise.resolve(undefined);
  }

  return Promise.resolve(resource);
}

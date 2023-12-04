import { Resource } from "@bonfhir/core/r5";
import { DatabaseInterface } from "../database-interface";

export function read<ReturnType extends Resource>(
  database: DatabaseInterface | undefined,
  id: string | undefined
): Promise<ReturnType | undefined> {
  if (!database) {
    throw new Error("Database not found");
  }

  // TODO: some resources will not be in the database, and will exist in memory or on the file system
  const resource = database.read<ReturnType>({ id });

  if (!resource) {
    return Promise.resolve(undefined);
  }

  return Promise.resolve(resource);
}

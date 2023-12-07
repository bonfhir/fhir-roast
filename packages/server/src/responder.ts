import { Resource } from "@bonfhir/core/r5";
import { renderer } from "./renderer";
import { Format } from "./format";

export type Responder = FHIRResponder;

export type FHIRResponder = (
  payload: Resource | undefined,
  format: Format
) => Response;

export function fhirResponder(payload: Resource | undefined, format: Format) {
  if (!payload) return new Response(undefined, { status: 204 });
  if (format === "json")
    return new Response(renderer(payload, format), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  if (format === "xml")
    return new Response(renderer(payload, format), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  throw new Error("Unknown format");
}

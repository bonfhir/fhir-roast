import { Resource } from "@bonfhir/core/r5";
import { renderer } from "./renderer";
import { Format } from "./format";
import { renderToReadableStream } from "react-dom/server";

export type Responder = ReactResponder | FHIRResponder;

export type ReactResponder = (
  payload: React.ReactElement | undefined,
  format: Format
) => Response;

export type FHIRResponder = (
  payload: Resource | undefined,
  format: Format
) => Response;

export async function reactResponder(
  payload: React.ReactElement | undefined,
  format: Format
) {
  if (!payload) return new Response(undefined, { status: 204 });
  return new Response(await renderToReadableStream(payload), {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}

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

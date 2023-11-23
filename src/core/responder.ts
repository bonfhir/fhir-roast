import { Resource } from "@bonfhir/core/r5";
import { renderer } from "./renderer";
import { Format } from "./router";

export type Responder = (payload: Resource, format: Format) => Response;
export const responder = (payload: Resource, format: Format) => {
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
};

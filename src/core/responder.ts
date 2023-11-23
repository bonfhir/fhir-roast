import { renderer } from "./renderer";
import { Format } from "./server";

export type Responder = (payload: any, format: Format) => Response;
export const responder = (payload: any, format: Format) => {
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

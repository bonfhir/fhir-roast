import { XMLBuilder } from "fast-xml-parser";
import { Format } from "./router";
import { Resource } from "@bonfhir/core/r5";

export type Renderer = (payload: Resource, format: Format) => string;

const xmlBuilder = new XMLBuilder({
  suppressEmptyNode: true,
  processEntities: false,
});

export const renderer: Renderer = (payload: Resource, format: Format) => {
  if (format === "json") return JSON.stringify(payload);
  if (format === "xml") {
    const document: any = {};
    document[payload.resourceType] = payload;
    return xmlBuilder.build(document);
  }
  throw new Error("Unknown format");
};

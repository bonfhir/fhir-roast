import { XMLBuilder } from "fast-xml-parser";
import { Format } from "./format";
import { Resource } from "@bonfhir/core/r5";

export type Renderer = (
  payload: Resource | undefined,
  format: Format
) => string;

const xmlBuilder = new XMLBuilder({
  suppressEmptyNode: true,
  processEntities: false,
});

export const renderer: Renderer = (
  payload: Resource | undefined,
  format: Format
) => {
  if (!payload) return "";
  if (format === "json") return JSON.stringify(payload);
  if (format === "xml") {
    const document: any = {};
    document[payload.resourceType] = payload;
    return xmlBuilder.build(document);
  }
  throw new Error("Unknown format");
};

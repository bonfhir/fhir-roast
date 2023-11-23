import { Format } from "./router";

export type Renderer = (payload: any, format: Format) => string;

export const renderer: Renderer = (payload: any, format: Format) => {
  if (format === "json") return JSON.stringify(payload);
  if (format === "xml") return JSON.stringify(payload);
  throw new Error("Unknown format");
};

import { OperationOutcome } from "@bonfhir/core/r5";
import { capabilityStatement } from "./capability-statement";
import { lookup } from "./code-system/lookup";
import { ParametersBuilder } from "./parameters-builder";
import { responder } from "./responder";

export type Format = "json" | "xml";

export const router = async (req: Request) => {
  const url = new URL(req.url);
  const params = url.searchParams;

  const paramsBuilder = new ParametersBuilder(req);

  if (url.pathname === "/")
    return responder(
      capabilityStatement,
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/CapabilityStatement")
    return responder(
      capabilityStatement,
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/CodeSystem/$lookup")
    return responder(
      await lookup(paramsBuilder.getParameters()),
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/CodeSystem/$validate-code")
    return responder(
      <OperationOutcome>{
        resourceType: "OperationOutcome",
        issue: [
          {
            severity: "error",
            code: "not-supported",
            diagnostics: "Not supported",
          },
        ],
      },
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/CodeSystem/$subsumes")
    return responder(
      <OperationOutcome>{
        resourceType: "OperationOutcome",
        issue: [
          {
            severity: "error",
            code: "not-supported",
            diagnostics: "Not supported",
          },
        ],
      },
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/ValueSet/$expand")
    return responder(
      <OperationOutcome>{
        resourceType: "OperationOutcome",
        issue: [
          {
            severity: "error",
            code: "not-supported",
            diagnostics: "Not supported",
          },
        ],
      },
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/ValueSet/$validate-code")
    return responder(
      <OperationOutcome>{
        resourceType: "OperationOutcome",
        issue: [
          {
            severity: "error",
            code: "not-supported",
            diagnostics: "Not supported",
          },
        ],
      },
      (params.get("_format") ?? "json") as Format
    );

  if (url.pathname === "/ConceptMap/$translate")
    return responder(
      <OperationOutcome>{
        resourceType: "OperationOutcome",
        issue: [
          {
            severity: "error",
            code: "not-supported",
            diagnostics: "Not supported",
          },
        ],
      },
      (params.get("_format") ?? "json") as Format
    );

  return new Response("404!", { status: 404 });
};

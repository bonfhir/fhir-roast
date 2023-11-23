import { CodeSystem } from "@bonfhir/core/r5";
import { capabilityStatement } from "./capability-statement";
import { responder } from "./responder";

export type Format = "json" | "xml";

const codeSystem: CodeSystem = {
  resourceType: "CodeSystem",
  content: "complete",
  status: "active",
};

export const router = (req: Request) => {
  const url = new URL(req.url);
  const params = url.searchParams;

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
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  if (url.pathname === "/CodeSystem/$validate-code")
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  if (url.pathname === "/CodeSystem/$subsumes")
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  if (url.pathname === "/ValueSet/$expand")
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  if (url.pathname === "/ValueSet/$validate-code")
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  if (url.pathname === "/ConceptMap/$translate")
    return responder(codeSystem, (params.get("_format") ?? "json") as Format);

  return new Response("404!", { status: 404 });
};

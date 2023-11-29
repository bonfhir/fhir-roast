import { OperationOutcome } from "@bonfhir/core/r5";
import { capabilityStatement } from "./capability-statement";
import { lookup } from "./code-system/lookup";
import { ParametersBuilder } from "./parameters-builder";
import { responder } from "./responder";
import { ILogObj, Logger } from "tslog";
import { Server } from "./server";

export type Format = "json" | "xml";

export class Router {
  log: Logger<ILogObj>;
  server: Server;

  constructor(server: Server, log: Logger<ILogObj>) {
    this.server = server;
    this.log = log;
  }

  // routes handling
  async routes(req: Request) {
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

    if (url.pathname === "/CodeSystem/$lookup") {
      return responder(
        await lookup(this.server.getDatabase(), paramsBuilder.getParameters()),
        (params.get("_format") ?? "json") as Format
      );
    }

    if (url.pathname === "/CodeSystem/$validate-code")
      throw new Error("Not implemented");

    if (url.pathname === "/CodeSystem/$subsumes")
      throw new Error("Not implemented");

    if (url.pathname === "/ValueSet/$expand")
      throw new Error("Not implemented");

    if (url.pathname === "/ValueSet/$validate-code")
      throw new Error("Not implemented");

    if (url.pathname === "/ConceptMap/$translate")
      throw new Error("Not implemented");

    return new Response("404!", { status: 404 });
  }

  // error responses
  error(error: Error) {
    if (error.message === "Not implemented")
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
        "json"
      );

    this.log.error(error);
    return new Response(error.message, { status: 500 });
  }
}

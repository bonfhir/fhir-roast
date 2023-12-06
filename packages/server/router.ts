import { CodeSystem, OperationOutcome } from "@bonfhir/core/r5";
import { capabilityStatement } from "./capability-statement";
import { lookup } from "./code-system/lookup";
import { validateCode } from "./code-system/validate-code";
import { subsumes } from "./code-system/subsumes";
import { ParametersBuilder } from "./parameters";
import { fhirResponder, reactResponder } from "./responder";
import { ILogObj, Logger } from "tslog";
import { ServerPlugin } from "./server-plugin";
import { read } from "./resource/read";
import { App as ReactApp } from "@fhir-roast/browser";
import { Format } from "./format";
import React from "react";
import { ReactResponder } from "@fhir-roast/browser";
import { Server as BunServer } from "bun";

export class Router {
  log: Logger<ILogObj>;
  server: ServerPlugin;
  reactResponder: ReactResponder;

  constructor(server: ServerPlugin, log: Logger<ILogObj>) {
    this.server = server;
    this.log = log;
    this.reactResponder = new ReactResponder();
  }

  // routes handling
  async routes(req: Request, server: BunServer) {
    await this.reactResponder.init();
    const url = new URL(req.url);
    const params = url.searchParams;
    const paramsBuilder = new ParametersBuilder(req);

    const buildFileRequest = this.reactResponder.serveBuild(req);
    if (buildFileRequest) {
      return buildFileRequest;
    }

    const demoPageRequest = await this.reactResponder.serveDemoPage(
      req,
      server
    );
    if (demoPageRequest) {
      return demoPageRequest;
    }

    if (url.pathname === "/")
      return fhirResponder(
        capabilityStatement,
        (params.get("_format") ?? "json") as Format
      );

    if (url.pathname === "/CapabilityStatement")
      return fhirResponder(
        capabilityStatement,
        (params.get("_format") ?? "json") as Format
      );

    if (url.pathname === "/CodeSystem/$lookup")
      return fhirResponder(
        await lookup(this.server.getDatabase(), paramsBuilder.getParameters()),
        (params.get("_format") ?? "json") as Format
      );

    if (url.pathname === "/CodeSystem/$validate-code")
      return fhirResponder(
        await validateCode(
          this.server.getDatabase(),
          paramsBuilder.getParameters()
        ),
        (params.get("_format") ?? "json") as Format
      );

    if (url.pathname === "/CodeSystem/$subsumes")
      return fhirResponder(
        await subsumes(
          this.server.getDatabase(),
          paramsBuilder.getParameters()
        ),
        (params.get("_format") ?? "json") as Format
      );

    if (url.pathname === "/CodeSystem/")
      return new Response("404!", { status: 404 });

    if (url.pathname.includes("/CodeSystem/")) {
      const { id } = paramsBuilder.getPathParameters();
      return fhirResponder(
        await read<CodeSystem>(this.server.getDatabase(), id),
        (params.get("_format") ?? "json") as Format
      );
    }

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
      return fhirResponder(
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

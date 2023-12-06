import { renderToReadableStream } from "react-dom/server";
import { build } from "bun";
import { Server as BunServer } from "bun";
import App from "./app";
import { ResponderInterface } from "@fhir-roast/core";

export class BrowserResponder implements ResponderInterface {
  buildsMatchers: Map<string, () => Response>;
  built: boolean;

  constructor() {
    this.buildsMatchers = new Map<string, () => Response>();
    this.built = false;
  }

  async respond(request: Request) {
    const buildFileRequest = this.serveBuild(request);
    if (buildFileRequest) {
      return buildFileRequest;
    }

    const appRequest = await this.serveApp(request);
    if (appRequest) {
      return appRequest;
    }
  }

  async init() {
    if (this.built) return;

    const builds = await build({
      entrypoints: ["./packages/browser/hydrate.tsx"],
      target: "browser",
      splitting: true,
      minify: {
        identifiers: true,
        syntax: true,
        whitespace: true,
      },
      outdir: "./build",
    });

    // build failed
    if (!builds.success) {
      throw new Error("Build failed");
    }

    // display build logs
    if (builds.logs) {
      for (const log of builds.logs) {
        console.log(log);
      }
    }

    for (const build of builds.outputs) {
      const path = ["/", build.path.split("/").pop()].join("");
      const responder = () =>
        new Response(build.stream(), {
          headers: {
            "Content-Type": build.type,
          },
        });
      this.buildsMatchers.set(path, responder);
    }

    this.built = true;
  }

  serveBuild(request: Request) {
    const { pathname } = new URL(request.url);

    const buildFileRequest = this.buildsMatchers.get(pathname);
    if (buildFileRequest) {
      return buildFileRequest();
    }
  }

  async serveApp(req: Request) {
    const { pathname } = new URL(req.url);

    if (pathname === "/" && req.method === "GET") {
      const stream = await renderToReadableStream(App(), {
        bootstrapModules: ["./hydrate.js"],
      });

      return new Response(stream, {
        headers: {
          "content-type": "text/html",
        },
      });
    }
  }
}

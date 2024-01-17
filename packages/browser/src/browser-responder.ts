import { ResponderInterface } from "@fhir-roast/core";
import { readdir, readFileSync, existsSync, type Dirent } from "fs";

export class BrowserResponder implements ResponderInterface {
  buildsMatchers: Map<string, () => Promise<Response | void>>;
  built: boolean;

  constructor() {
    this.buildsMatchers = new Map<string, () => Promise<Response | void>>();
    this.built = false;
  }

  async respond(request: Request) {
    const serveFile = await this.serve(request);
    if (serveFile) {
      return serveFile;
    }

    const serveRoot = await this.serveRoot(request);
    if (serveRoot) {
      return serveRoot;
    }
  }

  private getMime(file: Dirent): string {
    switch (file.name.split(".").pop()) {
      case "css":
        return "text/css";
      case "js":
        return "text/javascript";
      case "html":
        return "text/html";
      case "ico":
        return "image/x-icon";
      case "png":
        return "image/png";
      case "svg":
        return "image/svg+xml";
      case "json":
        return "application/json";
      default:
        return "application/octet-stream";
    }
  }

  async init() {
    if (!existsSync("./packages/browser/dist")) {
      console.error("Browser build not found, skipping...");
      return;
    }

    readdir(
      "./packages/browser/dist",
      {
        recursive: true,
        withFileTypes: true,
      },
      (err, files) => {
        if (err) throw err;
        for (const file of files) {
          if (file.isFile()) {
            console.log(file.name);
            const path = ["/", file.name].join("");
            const filePath = ["./packages/browser/dist", file.name].join("/");
            const responder = async () =>
              new Response(readFileSync(filePath), {
                headers: {
                  "Content-Type": this.getMime(file),
                },
              });
            this.buildsMatchers.set(path, responder);
          }
        }
      }
    );
  }

  private async serve(request: Request) {
    const { pathname } = new URL(request.url);
    const fileRequest = this.buildsMatchers.get(pathname);
    if (fileRequest) {
      return await fileRequest();
    }
  }

  private async serveRoot(request: Request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/" && request.method === "GET") {
      const root = this.buildsMatchers.get("/index.html");
      if (root) {
        return await root();
      }
    }
  }
}

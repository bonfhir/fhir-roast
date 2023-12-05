import { Parameters, ParametersParameter } from "@bonfhir/core/r5";
import { XMLParser } from "fast-xml-parser";

export class ParametersBuilder {
  url: URL;
  headers: Headers;
  method: string;
  params: URLSearchParams;
  body: any;

  constructor(req: Request) {
    this.url = new URL(req.url);
    this.headers = req.headers;
    this.method = req.method;
    this.params = this.url.searchParams;

    // TODO: this should probably be synchronous
    if (req.body && req.method !== "GET") {
      this.parseBody(req.body).then((body) => {
        if (req.headers.get("content-type") === "application/json")
          this.body = JSON.parse(body);

        if (req.headers.get("content-type") === "application/fhir+json")
          this.body = JSON.parse(body);

        if (req.headers.get("content-type") === "application/xml") {
          const parser = new XMLParser();
          this.body = parser.parse(body);
        }
      });
    }
  }

  private async parseBody(body: ReadableStream<string>) {
    const buffer = [];
    for await (const chunk of body) {
      buffer.push(chunk);
    }
    const bodyString = buffer.join("");
    return bodyString;
  }

  getPathParameters(): { id: string } {
    return {
      id: this.url.pathname.split("/")[2],
    };
  }

  // TODO: handle POST body
  getParameters(): Parameters {
    const parameters: ParametersParameter[] = [];

    for (const [key, value] of this.params.entries()) {
      if (key === "_format") continue;
      if (key === "system" || key === "url") {
        parameters.push({
          name: key,
          valueUri: value,
        });
      } else if (key === "code") {
        parameters.push({
          name: key,
          valueCode: value,
        });
      } else {
        parameters.push({
          name: key,
          valueString: value,
        });
      }
    }

    return {
      resourceType: "Parameters",
      parameter: [...parameters],
    };
  }
}

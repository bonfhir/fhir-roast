import { Parameters, ParametersParameter } from "@bonfhir/core/r5";

export class ParametersBuilder {
  params: URLSearchParams;
  url: URL;

  constructor(req: Request) {
    this.url = new URL(req.url);
    this.params = this.url.searchParams;
  }

  getParameters(): Parameters {
    const parameters: ParametersParameter[] = [];

    for (const [key, value] of this.params.entries()) {
      if (key === "_format") continue;
      if (key === "system") {
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

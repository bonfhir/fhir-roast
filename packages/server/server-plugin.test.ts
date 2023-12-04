import { expect, test } from "bun:test";
import { ServerPlugin } from "./server-plugin";
import { App } from "@fhir-roast/core";

const app = {} as App;

test("start", async () => {
  const server = new ServerPlugin(app);
  expect(server.start).toBeDefined();
});

test("stop", async () => {
  const server = new ServerPlugin(app);
  expect(server.stop).toBeDefined();
});

test("getDatabase", async () => {
  const server = new ServerPlugin(app);
  expect(server.getDatabase).toBeDefined();
});

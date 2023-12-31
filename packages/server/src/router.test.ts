import { expect, test } from "bun:test";
import { Router } from "./router";
import { ILogObj, Logger } from "tslog";
import { ServerPlugin } from "./server-plugin";

const server = {} as ServerPlugin;
const logger = {} as Logger<ILogObj>;

test("routes", async () => {
  const router = new Router(server, logger);
  expect(router.routes).toBeDefined();
});

test("error", async () => {
  const router = new Router(server, logger);
  expect(router.error).toBeDefined();
});

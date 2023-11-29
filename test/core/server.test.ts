import { expect, test } from "bun:test";
import { Server } from "../../src/core/server";

test("start", async () => {
  const server = new Server();
  expect(server.start()).toBeDefined();
});

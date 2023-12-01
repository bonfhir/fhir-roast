import { expect, test } from "bun:test";
import { Server } from "./server";

test("start", async () => {
  const server = new Server();
  expect(server.start()).toBeDefined();
});

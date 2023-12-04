import { expect, test } from "bun:test";
import { Server } from "./server";

test("start", async () => {
  const server = new Server();
  expect(server.start).toBeDefined();
});

test("stop", async () => {
  const server = new Server();
  expect(server.stop).toBeDefined();
});

test("register", async () => {
  const server = new Server();
  expect(server.register).toBeDefined();
});

test("getDatabase", async () => {
  const server = new Server();
  expect(server.getDatabase).toBeDefined();
});

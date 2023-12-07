import { expect, test } from "bun:test";
import { App } from "./app";
import { DatabaseInterface } from "./database-interface";

test("start", async () => {
  const app = new App();
  expect(app.start).toBeDefined();
  expect(app.start).toBeInstanceOf(Function);
  // TODO
  // await app.start();
});

test("stop", async () => {
  const app = new App();
  expect(app.stop).toBeDefined();
  expect(app.stop).toBeInstanceOf(Function);
  // TODO
  // app.start();
  // await app.stop();
});

test("getDatabase", async () => {
  const app = new App();
  expect(app.getDatabase).toBeDefined();
  expect(app.getDatabase).toBeInstanceOf(Function);
  expect(app.getDatabase()).toBe(undefined);
  // TODO
  // await app.start();
  // expect(app.getDatabase()).not.toBe(undefined);
});

test("getBrowser", () => {
  const app = new App();
  expect(app.getBrowser).toBeDefined();
  expect(app.getBrowser).toBeInstanceOf(Function);
  expect(app.getBrowser()).toBe(undefined);
  // TODO
  // await app.start();
  // expect(app.getBrowser()).not.toBe(undefined);
});

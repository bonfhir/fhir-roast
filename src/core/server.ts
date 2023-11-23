import { router } from "./router";

const server = Bun.serve({
  port: 3000,
  fetch: router,
});

console.log(`Listening on http://localhost:${server.port} ...`);

export type { server };

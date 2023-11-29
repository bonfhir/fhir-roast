import { Server } from "./src/core/server";
import { TerminologyManager } from "./src/terminology/terminology-manager";

// plugins
import "./src/snomed";

const terminologies = TerminologyManager.load(["http://snomed.info/sct"]);

const server = new Server();
server.register(terminologies);
server.start();

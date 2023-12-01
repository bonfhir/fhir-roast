import { Server } from "fhir-roast-core/server";
import { TerminologyManager } from "fhir-roast-terminology/terminology-manager";

// plugins
import "fhir-roast-snomed";

const terminologies = TerminologyManager.load(["http://snomed.info/sct"]);

const server = new Server();
server.register(terminologies);
server.start();

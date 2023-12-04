import { BrowserPlugin } from "@fhir-roast/browser";
import { App } from "@fhir-roast/core";
import { DatabasePlugin } from "@fhir-roast/database";
import { ServerPlugin } from "@fhir-roast/server";
import { TerminologyPlugin } from "@fhir-roast/terminology";

const app = new App();

// plugins
// TODO: this should be unnecessary
import "@fhir-roast/snomed";
import { SNOMED } from "@fhir-roast/snomed";

// TODO: core plugins should load automatically
const serverPlugin = new ServerPlugin(app);
const databasePlugin = new DatabasePlugin(app);
const terminologyPlugin = new TerminologyPlugin(app);
const browserPlugin = new BrowserPlugin(app);
app.pluginManager.load(serverPlugin);
app.pluginManager.load(databasePlugin);
app.pluginManager.load(terminologyPlugin);
app.pluginManager.load(browserPlugin);

// TODO: plugins should be able to register terminologies automatically
terminologyPlugin.terminologyManager.register(new SNOMED());
const terminologies = terminologyPlugin.terminologyManager.load([
  "http://snomed.info/sct",
]);
databasePlugin.register(terminologies);

app.start();

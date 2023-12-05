import { BrowserPlugin } from "@fhir-roast/browser";
import { App } from "@fhir-roast/core";
import { DatabasePlugin } from "@fhir-roast/database";
import { ServerPlugin } from "@fhir-roast/server";
import { TerminologyPlugin } from "@fhir-roast/terminology";
import { SNOMEDPlugin } from "@fhir-roast/snomed";

const app = new App();

// TODO: core plugins should load automatically
const serverPlugin = new ServerPlugin(app);
const databasePlugin = new DatabasePlugin(app);
const terminologyPlugin = new TerminologyPlugin(app);
const browserPlugin = new BrowserPlugin(app);
const snomedPlugin = new SNOMEDPlugin(app);
app.pluginManager.load(serverPlugin);
app.pluginManager.load(databasePlugin);
app.pluginManager.load(terminologyPlugin);
app.pluginManager.load(browserPlugin);
app.pluginManager.load(snomedPlugin);

app.start();

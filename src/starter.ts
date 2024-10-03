import { FreonLayout, WebappConfigurator } from "@freon4dsl/webapp-lib";
import {FreLogger, ServerCommunication} from "@freon4dsl/core";
import { LionCore_M3Environment } from "./picode/config/gen/LionCore_M3Environment.js";
// import { LionWebRepositoryCommunication } from "@freon4dsl/core"

/**
 * The one and only reference to the actual language for which this editor runs
 */
WebappConfigurator.getInstance().setEditorEnvironment(LionCore_M3Environment.getInstance());

/**
 * The one and only reference to the server on which the models are stored
 */
// WebappConfigurator.getInstance().setServerCommunication(LionWebRepositoryCommunication.getInstance());
WebappConfigurator.getInstance().setServerCommunication(ServerCommunication.getInstance());

/**
 * Now start the app ...
 */
const app = new FreonLayout({
    target: document.body,
});

// FreLogger.unmute("TextComponent")
// FreLogger.unmute("TextDropdownComponent")
// FreLogger.unmute("BehaviorUtils")

export default app;

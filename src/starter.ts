import { FreonLayout, WebappConfigurator } from "@freon4dsl/webapp-lib";
import {FreLogger, ServerCommunication} from "@freon4dsl/core";
import { LionCore_M3Environment } from "./freon/config/gen/LionCore_M3Environment.js";
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

// FreLogger.unmute("FreLionwebSerializer")
// FreLogger.unmute("TextComponent")
// FreLogger.unmute("TextDropdownComponent")
// FreLogger.unmute("FreEditor")
// FreLogger.unmute("ReferenceBox")
// FreLogger.unmute("UtilRefHelpers")
// FreLogger.unmute("BehaviorUtils")

export default app;

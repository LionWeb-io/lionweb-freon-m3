// import { FreLogger } from "@freon4dsl/core";

// import { setDevelopment } from "@freon4dsl/webapp-lib";

// import { FreLogger } from "@freon4dsl/core";

import { FreLogger } from "@freon4dsl/core";
import { setDevelopment } from "@freon4dsl/weblib-flowbite";

/**
 * Configure loggers. Loggers are muted by default, unmuting loggers that you want to
 * activate here.
 */
export function configureLoggers() {
    // NB Logging willl only be shown if setDevelopment is set to true:
    setDevelopment(true)
    
    // Activate the following loggers
    FreLogger.unmute("FreEditor")
    FreLogger.unmute("Box")
    // FreLogger.unmute("AstChanger")
    // FreLogger.unmute("ReferenceUpdateManager")
    // FreLogger.unmute("ReferenceUpdateWorker")
    // FreLogger.unmute("FreUndoStackManager")
    // // Do not show log messages contaning any of these strings
    // FreLogger.setFilter(["beforeUpdate", "setFocus", "afterUpdate", "onMount", "REFRESH", "refresh"])
}

import { FreLanguage } from "@freon4dsl/core";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
import { LionCore_M3Scoper } from "./LionCore_M3Scoper.js";
export function initializeScopers(rootScoper) {
    for (const p of freonConfiguration.customScopers) {
        rootScoper.appendScoper(p);
    }
    rootScoper.appendScoper(new LionCore_M3Scoper());
}
export function initializeScoperDef(rootScoper) {
    FreLanguage.getInstance().classifier("LionCore_M3").isNamespace = true;
    initializeScopers(rootScoper);
}
//# sourceMappingURL=LionCore_M3ScoperDef.js.map
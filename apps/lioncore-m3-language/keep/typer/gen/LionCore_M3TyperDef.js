import { LionCore_M3TyperPart } from "./LionCore_M3TyperPart.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
export function initializeTypers(rootTyper) {
    for (const p of freonConfiguration.customTypers) {
        rootTyper.appendTyper(p);
    }
    rootTyper.appendTyper(new LionCore_M3TyperPart());
}
//# sourceMappingURL=LionCore_M3TyperDef.js.map
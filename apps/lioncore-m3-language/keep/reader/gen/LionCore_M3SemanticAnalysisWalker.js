import { FreLanguageEnvironment, notNullOrUndefined, } from "@freon4dsl/core";
import { Property } from "../../language/gen/index.js";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
export class LionCore_M3SemanticAnalysisWalker extends LionCore_M3DefaultWorker {
    constructor(changesToBeMade) {
        super();
        this.changesToBeMade = changesToBeMade;
    }
    findReplacement(node, referredElem) {
        const scoper = FreLanguageEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleNodes(node).filter((elem) => elem.name === referredElem.name);
        if (possibles.length > 0) {
            let replacement = undefined;
            for (const elem of possibles) {
                const metatype = elem.freLanguageConcept();
            }
            if (notNullOrUndefined(replacement))
                this.changesToBeMade.set(node, replacement);
        }
        else {
            if (referredElem.name === "true") {
                this.changesToBeMade.set(node, Property.create({ optional: true }));
            }
            else if (referredElem.name === "false") {
                this.changesToBeMade.set(node, Property.create({ optional: false }));
            }
        }
    }
}
//# sourceMappingURL=LionCore_M3SemanticAnalysisWalker.js.map
import { FreLanguage, notNullOrUndefined } from "@freon4dsl/core";
import { LionCore_M3Walker } from "../../utils/gen/index.js";
import { LionCore_M3SemanticAnalysisWalker } from "./LionCore_M3SemanticAnalysisWalker.js";
export class LionCore_M3SemanticAnalyser {
    correct(modelunit) {
        let changesToBeMade = new Map();
        const myWalker = new LionCore_M3Walker();
        let myCorrector = new LionCore_M3SemanticAnalysisWalker(changesToBeMade);
        myWalker.myWorkers.push(myCorrector);
        myWalker.walk(modelunit, () => {
            return true;
        });
        for (const [toBeReplaced, newObject] of changesToBeMade) {
            const myType = FreLanguage.getInstance().concept(toBeReplaced.freLanguageConcept());
            if (notNullOrUndefined(myType)) {
                myType.properties.forEach((prop) => {
                    if (prop.type !== "boolean" && prop.name in toBeReplaced) {
                        newObject[prop.name] = toBeReplaced[prop.name];
                    }
                });
                let parent = toBeReplaced.freOwnerDescriptor().owner;
                const propName = toBeReplaced.freOwnerDescriptor().propertyName;
                const propIndex = toBeReplaced.freOwnerDescriptor().propertyIndex;
                if (notNullOrUndefined(propIndex)) {
                    parent[propName].splice(propIndex, 1, newObject);
                }
                else {
                    parent[propName] = newObject;
                }
            }
        }
    }
}
//# sourceMappingURL=LionCore_M3SemanticAnalyser.js.map
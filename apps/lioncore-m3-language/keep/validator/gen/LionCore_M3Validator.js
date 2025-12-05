import { LionCore_M3Walker } from "../../utils/gen/index.js";
import { LionCore_M3NonOptionalsChecker } from "./LionCore_M3NonOptionalsChecker.js";
import { LionCore_M3NamespaceChecker } from "./LionCore_M3NamespaceChecker.js";
import { LionCore_M3ReferenceChecker } from "./LionCore_M3ReferenceChecker.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
export class LionCore_M3Validator {
    validate(node, includeChildren = true) {
        const errorlist = [];
        const myWalker = new LionCore_M3Walker();
        let myChecker = new LionCore_M3NonOptionalsChecker();
        myChecker.errorList = errorlist;
        myWalker.myWorkers.push(myChecker);
        myChecker = new LionCore_M3ReferenceChecker();
        myChecker.errorList = errorlist;
        myWalker.myWorkers.push(myChecker);
        myChecker = new LionCore_M3NamespaceChecker();
        myChecker.errorList = errorlist;
        myWalker.myWorkers.push(myChecker);
        for (let checker of freonConfiguration.customValidations) {
            checker.errorList = errorlist;
            myWalker.myWorkers.push(checker);
        }
        myWalker.walk(node, () => {
            return includeChildren;
        });
        return errorlist;
    }
}
//# sourceMappingURL=LionCore_M3Validator.js.map
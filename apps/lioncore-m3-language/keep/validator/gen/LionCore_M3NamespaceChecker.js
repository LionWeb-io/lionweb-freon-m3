import { FreError, FreErrorSeverity, FreLanguageEnvironment, FreLanguage, FreNamespace, notNullOrUndefined, } from "@freon4dsl/core";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
export class LionCore_M3NamespaceChecker extends LionCore_M3DefaultWorker {
    constructor() {
        super(...arguments);
        this.myWriter = FreLanguageEnvironment.getInstance().writer;
        this.errorList = [];
    }
    execBeforeLionCore_M3(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("LionCore_M3")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeLanguage(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Language")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeNode(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Node")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeAnnotation(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Annotation")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeConcept(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Concept")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeInterface(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Interface")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeContainment(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Containment")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeDataType(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("DataType")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeEnumeration(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Enumeration")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeEnumerationLiteral(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("EnumerationLiteral")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeFeature(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Feature")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeClassifier(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Classifier")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeLink(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Link")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeLanguageEntity(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("LanguageEntity")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforePrimitiveType(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("PrimitiveType")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeProperty(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Property")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    execBeforeReference(node) {
        if (notNullOrUndefined(node) && FreLanguage.getInstance().classifier("Reference")?.isNamespace) {
            this.checkDuplicateNamesInNamespace(node);
        }
        return false;
    }
    checkDuplicateNamesInNamespace(node) {
        const declaredNodes = FreNamespace.create(node).getDeclaredNodes(false);
        const declaredNames = [];
        const doubleNames = [];
        declaredNodes.forEach((nn) => {
            if (declaredNames.indexOf(nn.name) > -1) {
                doubleNames.push(nn.name);
            }
            else {
                declaredNames.push(nn.name);
            }
        });
        if (doubleNames.length > 0) {
            const namespaceName = "name" in node ? node.name : "<unnamed>";
            this.errorList.push(new FreError(`Namespace ${namespaceName} has multiple nodes with the same name [${doubleNames.map((n) => n).join(", ")}].`, node, namespaceName, "name", FreErrorSeverity.Error));
        }
    }
}
//# sourceMappingURL=LionCore_M3NamespaceChecker.js.map
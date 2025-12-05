import { FreError, FreErrorSeverity, FreLanguageEnvironment, isNullOrUndefined, } from "@freon4dsl/core";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
export class LionCore_M3ReferenceChecker extends LionCore_M3DefaultWorker {
    constructor() {
        super(...arguments);
        this.myWriter = FreLanguageEnvironment.getInstance().writer;
        this.errorList = [];
        this.refSeparator = "/";
    }
    execBeforeLanguage(node) {
        for (const referredElem of node.dependsOn) {
            if (isNullOrUndefined(referredElem.referred)) {
                this.makeErrorMessage(node, referredElem, "dependsOn", `${node.name}`);
            }
        }
        return false;
    }
    execBeforeAnnotation(node) {
        if (!!node.annotates && node.annotates.referred === null) {
            this.makeErrorMessage(node, node.annotates, "annotates", `${node.name}`);
        }
        if (!!node.extends && node.extends.referred === null) {
            this.makeErrorMessage(node, node.extends, "extends", `${node.name}`);
        }
        for (const referredElem of node.implements) {
            if (isNullOrUndefined(referredElem.referred)) {
                this.makeErrorMessage(node, referredElem, "implements", `${node.name}`);
            }
        }
        return false;
    }
    execBeforeConcept(node) {
        if (!!node.extends && node.extends.referred === null) {
            this.makeErrorMessage(node, node.extends, "extends", `${node.name}`);
        }
        for (const referredElem of node.implements) {
            if (isNullOrUndefined(referredElem.referred)) {
                this.makeErrorMessage(node, referredElem, "implements", `${node.name}`);
            }
        }
        return false;
    }
    execBeforeInterface(node) {
        for (const referredElem of node.extends) {
            if (isNullOrUndefined(referredElem.referred)) {
                this.makeErrorMessage(node, referredElem, "extends", `${node.name}`);
            }
        }
        return false;
    }
    execBeforeContainment(node) {
        if (!!node.type && node.type.referred === null) {
            this.makeErrorMessage(node, node.type, "type", `${node.name}`);
        }
        return false;
    }
    execBeforeLink(node) {
        if (!!node.type && node.type.referred === null) {
            this.makeErrorMessage(node, node.type, "type", `${node.name}`);
        }
        return false;
    }
    execBeforeProperty(node) {
        if (!!node.type && node.type.referred === null) {
            this.makeErrorMessage(node, node.type, "type", `${node.name}`);
        }
        return false;
    }
    execBeforeReference(node) {
        if (!!node.type && node.type.referred === null) {
            this.makeErrorMessage(node, node.type, "type", `${node.name}`);
        }
        return false;
    }
    makeErrorMessage(node, referredElem, propertyName, locationDescription) {
        const scoper = FreLanguageEnvironment.getInstance().scoper;
        const possibles = scoper.getVisibleNodes(node).filter((elem) => elem.name === referredElem.name);
        if (possibles.length > 0) {
            this.errorList.push(new FreError(`Reference '${referredElem.pathnameToString(this.refSeparator)}' should have type '${referredElem.typeName}', but found type(s) [${possibles.map((elem) => `${elem.freLanguageConcept()}`).join(", ")}]`, node, `${propertyName} of ${locationDescription}`, `${propertyName}`, FreErrorSeverity.Error));
        }
        else {
            this.errorList.push(new FreError(`Cannot find reference '${referredElem.pathnameToString(this.refSeparator)}'`, node, `${propertyName} of ${locationDescription}`, `${propertyName}`, FreErrorSeverity.Error));
        }
    }
}
//# sourceMappingURL=LionCore_M3ReferenceChecker.js.map
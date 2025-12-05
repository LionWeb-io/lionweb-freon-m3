import { FreError, FreErrorSeverity, FreLanguageEnvironment, isNullOrUndefined } from "@freon4dsl/core";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
export class LionCore_M3NonOptionalsChecker extends LionCore_M3DefaultWorker {
    constructor() {
        super(...arguments);
        this.myWriter = FreLanguageEnvironment.getInstance().writer;
        this.errorList = [];
    }
    execBeforeLionCore_M3(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeLanguage(node) {
        if (isNullOrUndefined(node.version) || node.version?.length === 0) {
            this.errorList.push(new FreError("Property 'version' must have a value", node, node.name, "version", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeAnnotation(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeConcept(node) {
        if (isNullOrUndefined(node.abstract)) {
            this.errorList.push(new FreError("Property 'abstract' must have a value", node, node.name, "abstract", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.partition)) {
            this.errorList.push(new FreError("Property 'partition' must have a value", node, node.name, "partition", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeInterface(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeContainment(node) {
        if (isNullOrUndefined(node.multiple)) {
            this.errorList.push(new FreError("Property 'multiple' must have a value", node, node.name, "multiple", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.optional)) {
            this.errorList.push(new FreError("Property 'optional' must have a value", node, node.name, "optional", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.type)) {
            this.errorList.push(new FreError("Property 'type' must have a value", node, node.name, "type", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeDataType(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeEnumeration(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeEnumerationLiteral(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeFeature(node) {
        if (isNullOrUndefined(node.optional)) {
            this.errorList.push(new FreError("Property 'optional' must have a value", node, node.name, "optional", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeClassifier(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeLink(node) {
        if (isNullOrUndefined(node.multiple)) {
            this.errorList.push(new FreError("Property 'multiple' must have a value", node, node.name, "multiple", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.optional)) {
            this.errorList.push(new FreError("Property 'optional' must have a value", node, node.name, "optional", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.type)) {
            this.errorList.push(new FreError("Property 'type' must have a value", node, node.name, "type", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeLanguageEntity(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforePrimitiveType(node) {
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeProperty(node) {
        if (isNullOrUndefined(node.optional)) {
            this.errorList.push(new FreError("Property 'optional' must have a value", node, node.name, "optional", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.type)) {
            this.errorList.push(new FreError("Property 'type' must have a value", node, node.name, "type", FreErrorSeverity.Error));
        }
        return false;
    }
    execBeforeReference(node) {
        if (isNullOrUndefined(node.multiple)) {
            this.errorList.push(new FreError("Property 'multiple' must have a value", node, node.name, "multiple", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.optional)) {
            this.errorList.push(new FreError("Property 'optional' must have a value", node, node.name, "optional", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.name) || node.name?.length === 0) {
            this.errorList.push(new FreError("Property 'name' must have a value", node, node.name, "name", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.key) || node.key?.length === 0) {
            this.errorList.push(new FreError("Property 'key' must have a value", node, node.name, "key", FreErrorSeverity.Error));
        }
        if (isNullOrUndefined(node.type)) {
            this.errorList.push(new FreError("Property 'type' must have a value", node, node.name, "type", FreErrorSeverity.Error));
        }
        return false;
    }
}
//# sourceMappingURL=LionCore_M3NonOptionalsChecker.js.map
import { MobxModelElementImpl, observableprim, observablepartlist, notNullOrUndefined, FreUtils, matchElementList, matchReferenceList, } from "@freon4dsl/core";
import { makeObservable, action } from "mobx";
export class Language extends MobxModelElementImpl {
    static create(data) {
        const result = new Language(data.$id);
        if (notNullOrUndefined(data.version)) {
            result.version = data.version;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.entities)) {
            data.entities.forEach((x) => result.entities.push(x));
        }
        if (notNullOrUndefined(data.dependsOn)) {
            data.dependsOn.forEach((x) => result.dependsOn.push(x));
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super();
        this.fileExtension = "";
        this.$typename = "Language";
        this.$id = "";
        if (!!id) {
            this.$id = id;
        }
        else {
            this.$id = FreUtils.ID();
        }
        observableprim(this, "version");
        this.version = "";
        observableprim(this, "key");
        this.key = "";
        observableprim(this, "name");
        this.name = "";
        observablepartlist(this, "entities");
        observablepartlist(this, "dependsOn");
        makeObservable(this, {
            copy: action,
        });
    }
    freLanguageConcept() {
        return this.$typename;
    }
    freId() {
        return this.$id;
    }
    freIsModel() {
        return false;
    }
    freIsUnit() {
        return true;
    }
    freIsExpression() {
        return false;
    }
    freIsBinaryExpression() {
        return false;
    }
    copy() {
        const result = new Language();
        if (notNullOrUndefined(this.version)) {
            result.version = this.version;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.entities)) {
            this.entities.forEach((x) => result.entities.push(x.copy()));
        }
        if (notNullOrUndefined(this.dependsOn)) {
            this.dependsOn.forEach((x) => result.dependsOn.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = true;
        if (result && toBeMatched.version !== null && toBeMatched.version !== undefined && toBeMatched.version.length > 0) {
            result = result && this.version === toBeMatched.version;
        }
        if (result && toBeMatched.key !== null && toBeMatched.key !== undefined && toBeMatched.key.length > 0) {
            result = result && this.key === toBeMatched.key;
        }
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && notNullOrUndefined(toBeMatched.entities)) {
            result = result && matchElementList(this.entities, toBeMatched.entities);
        }
        if (result && notNullOrUndefined(toBeMatched.dependsOn)) {
            result = result && matchReferenceList(this.dependsOn, toBeMatched.dependsOn);
        }
        return result;
    }
}
//# sourceMappingURL=Language.js.map
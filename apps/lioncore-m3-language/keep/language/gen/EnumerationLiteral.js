import { MobxModelElementImpl, observableprim, notNullOrUndefined, FreUtils } from "@freon4dsl/core";
import { makeObservable, action } from "mobx";
export class EnumerationLiteral extends MobxModelElementImpl {
    static create(data) {
        const result = new EnumerationLiteral(data.$id);
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super();
        this.$typename = "EnumerationLiteral";
        this.$id = "";
        if (!!id) {
            this.$id = id;
        }
        else {
            this.$id = FreUtils.ID();
        }
        observableprim(this, "name");
        this.name = "";
        observableprim(this, "key");
        this.key = "";
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
        return false;
    }
    freIsExpression() {
        return false;
    }
    freIsBinaryExpression() {
        return false;
    }
    copy() {
        const result = new EnumerationLiteral();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        return result;
    }
    match(toBeMatched) {
        let result = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && toBeMatched.key !== null && toBeMatched.key !== undefined && toBeMatched.key.length > 0) {
            result = result && this.key === toBeMatched.key;
        }
        return result;
    }
}
//# sourceMappingURL=EnumerationLiteral.js.map
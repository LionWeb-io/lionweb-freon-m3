import { observablepartlist, notNullOrUndefined, matchReferenceList, } from "@freon4dsl/core";
import { Classifier } from "./internal.js";
export class Interface extends Classifier {
    static create(data) {
        const result = new Interface(data.$id);
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.features)) {
            data.features.forEach((x) => result.features.push(x));
        }
        if (notNullOrUndefined(data.extends)) {
            data.extends.forEach((x) => result.extends.push(x));
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super(id);
        this.$typename = "Interface";
        observablepartlist(this, "extends");
    }
    freLanguageConcept() {
        return this.$typename;
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
        const result = new Interface();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        if (notNullOrUndefined(this.features)) {
            this.features.forEach((x) => result.features.push(x.copy()));
        }
        if (notNullOrUndefined(this.extends)) {
            this.extends.forEach((x) => result.extends.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        if (result && notNullOrUndefined(toBeMatched.extends)) {
            result = result && matchReferenceList(this.extends, toBeMatched.extends);
        }
        return result;
    }
    get $extends() {
        const result = [];
        for (const $part of this.extends) {
            if (!!$part.referred) {
                result.push($part.referred);
            }
        }
        return result;
    }
}
//# sourceMappingURL=Interface.js.map
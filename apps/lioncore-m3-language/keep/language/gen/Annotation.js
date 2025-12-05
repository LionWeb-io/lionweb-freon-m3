import { observablepart, observablepartlist, notNullOrUndefined, matchReferenceList, } from "@freon4dsl/core";
import { Classifier } from "./internal.js";
export class Annotation extends Classifier {
    static create(data) {
        const result = new Annotation(data.$id);
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.features)) {
            data.features.forEach((x) => result.features.push(x));
        }
        if (notNullOrUndefined(data.annotates)) {
            result.annotates = data.annotates;
        }
        if (notNullOrUndefined(data.extends)) {
            result.extends = data.extends;
        }
        if (notNullOrUndefined(data.implements)) {
            data.implements.forEach((x) => result.implements.push(x));
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super(id);
        this.$typename = "Annotation";
        observablepart(this, "annotates");
        observablepart(this, "extends");
        observablepartlist(this, "implements");
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
        const result = new Annotation();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        if (notNullOrUndefined(this.features)) {
            this.features.forEach((x) => result.features.push(x.copy()));
        }
        if (notNullOrUndefined(this.annotates)) {
            result.annotates = this.annotates.copy();
        }
        if (notNullOrUndefined(this.extends)) {
            result.extends = this.extends.copy();
        }
        if (notNullOrUndefined(this.implements)) {
            this.implements.forEach((x) => result.implements.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        if (result && notNullOrUndefined(toBeMatched.annotates)) {
            if (this.annotates) {
                result = result && this.annotates.match(toBeMatched.annotates);
            }
        }
        if (result && notNullOrUndefined(toBeMatched.extends)) {
            if (this.extends) {
                result = result && this.extends.match(toBeMatched.extends);
            }
        }
        if (result && notNullOrUndefined(toBeMatched.implements)) {
            result = result && matchReferenceList(this.implements, toBeMatched.implements);
        }
        return result;
    }
    get $annotates() {
        if (!!this.annotates) {
            return this.annotates.referred;
        }
        return undefined;
    }
    get $extends() {
        if (!!this.extends) {
            return this.extends.referred;
        }
        return undefined;
    }
    get $implements() {
        const result = [];
        for (const $part of this.implements) {
            if (!!$part.referred) {
                result.push($part.referred);
            }
        }
        return result;
    }
}
//# sourceMappingURL=Annotation.js.map
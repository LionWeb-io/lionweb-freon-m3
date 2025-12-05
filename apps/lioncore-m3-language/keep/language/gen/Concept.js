import { observableprim, observablepart, observablepartlist, notNullOrUndefined, matchReferenceList, } from "@freon4dsl/core";
import { Classifier } from "./internal.js";
export class Concept extends Classifier {
    static create(data) {
        const result = new Concept(data.$id);
        if (notNullOrUndefined(data.abstract)) {
            result.abstract = data.abstract;
        }
        if (notNullOrUndefined(data.partition)) {
            result.partition = data.partition;
        }
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
        this.$typename = "Concept";
        observableprim(this, "abstract");
        this.abstract = false;
        observableprim(this, "partition");
        this.partition = false;
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
        const result = new Concept();
        if (notNullOrUndefined(this.abstract)) {
            result.abstract = this.abstract;
        }
        if (notNullOrUndefined(this.partition)) {
            result.partition = this.partition;
        }
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
            result.extends = this.extends.copy();
        }
        if (notNullOrUndefined(this.implements)) {
            this.implements.forEach((x) => result.implements.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        if (result && toBeMatched.abstract !== null && toBeMatched.abstract !== undefined) {
            result = result && this.abstract === toBeMatched.abstract;
        }
        if (result && toBeMatched.partition !== null && toBeMatched.partition !== undefined) {
            result = result && this.partition === toBeMatched.partition;
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
//# sourceMappingURL=Concept.js.map
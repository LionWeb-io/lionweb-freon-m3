import { observablepartlist, notNullOrUndefined, matchElementList } from "@freon4dsl/core";
import { DataType } from "./internal.js";
export class Enumeration extends DataType {
    static create(data) {
        const result = new Enumeration(data.$id);
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.literals)) {
            data.literals.forEach((x) => result.literals.push(x));
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super(id);
        this.$typename = "Enumeration";
        observablepartlist(this, "literals");
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
        const result = new Enumeration();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        if (notNullOrUndefined(this.literals)) {
            this.literals.forEach((x) => result.literals.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        if (result && notNullOrUndefined(toBeMatched.literals)) {
            result = result && matchElementList(this.literals, toBeMatched.literals);
        }
        return result;
    }
}
//# sourceMappingURL=Enumeration.js.map
import { notNullOrUndefined } from "@freon4dsl/core";
import { Link } from "./internal.js";
export class Reference extends Link {
    static create(data) {
        const result = new Reference(data.$id);
        if (notNullOrUndefined(data.multiple)) {
            result.multiple = data.multiple;
        }
        if (notNullOrUndefined(data.optional)) {
            result.optional = data.optional;
        }
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.key)) {
            result.key = data.key;
        }
        if (notNullOrUndefined(data.type)) {
            result.type = data.type;
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super(id);
        this.$typename = "Reference";
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
        const result = new Reference();
        if (notNullOrUndefined(this.multiple)) {
            result.multiple = this.multiple;
        }
        if (notNullOrUndefined(this.optional)) {
            result.optional = this.optional;
        }
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        if (notNullOrUndefined(this.type)) {
            result.type = this.type.copy();
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        return result;
    }
}
//# sourceMappingURL=Reference.js.map
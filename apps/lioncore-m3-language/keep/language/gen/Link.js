import { observableprim, observablepart, notNullOrUndefined } from "@freon4dsl/core";
import { Feature } from "./internal.js";
export class Link extends Feature {
    constructor(id) {
        super(id);
        this.$typename = "Link";
        observableprim(this, "multiple");
        this.multiple = false;
        observablepart(this, "type");
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
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        if (result && toBeMatched.multiple !== null && toBeMatched.multiple !== undefined) {
            result = result && this.multiple === toBeMatched.multiple;
        }
        if (result && notNullOrUndefined(toBeMatched.type)) {
            result = result && this.type.match(toBeMatched.type);
        }
        return result;
    }
    get $type() {
        if (!!this.type) {
            return this.type.referred;
        }
        return undefined;
    }
}
//# sourceMappingURL=Link.js.map
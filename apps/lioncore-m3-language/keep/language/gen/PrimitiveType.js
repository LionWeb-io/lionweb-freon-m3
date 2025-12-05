import { notNullOrUndefined } from "@freon4dsl/core";
import { DataType } from "./internal.js";
export class PrimitiveType extends DataType {
    static create(data) {
        const result = new PrimitiveType(data.$id);
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
        super(id);
        this.$typename = "PrimitiveType";
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
        const result = new PrimitiveType();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.key)) {
            result.key = this.key;
        }
        return result;
    }
    match(toBeMatched) {
        let result = super.match(toBeMatched);
        return result;
    }
}
//# sourceMappingURL=PrimitiveType.js.map
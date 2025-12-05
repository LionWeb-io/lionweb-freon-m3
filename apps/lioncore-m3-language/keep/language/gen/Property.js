import { observablepart, notNullOrUndefined } from "@freon4dsl/core";
import { Feature } from "./internal.js";
export class Property extends Feature {
    static create(data) {
        const result = new Property(data.$id);
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
        this.$typename = "Property";
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
    copy() {
        const result = new Property();
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
//# sourceMappingURL=Property.js.map
import { MobxModelElementImpl, observableprim, FreUtils } from "@freon4dsl/core";
import { makeObservable, action } from "mobx";
export class Feature extends MobxModelElementImpl {
    constructor(id) {
        super();
        this.$typename = "Feature";
        this.$id = "";
        if (!!id) {
            this.$id = id;
        }
        else {
            this.$id = FreUtils.ID();
        }
        observableprim(this, "optional");
        this.optional = false;
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
    match(toBeMatched) {
        let result = true;
        if (result && toBeMatched.optional !== null && toBeMatched.optional !== undefined) {
            result = result && this.optional === toBeMatched.optional;
        }
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && toBeMatched.key !== null && toBeMatched.key !== undefined && toBeMatched.key.length > 0) {
            result = result && this.key === toBeMatched.key;
        }
        return result;
    }
}
//# sourceMappingURL=Feature.js.map
import { observablepartlist, notNullOrUndefined, matchElementList } from "@freon4dsl/core";
import { LanguageEntity } from "./internal.js";
export class Classifier extends LanguageEntity {
    constructor(id) {
        super(id);
        this.$typename = "Classifier";
        observablepartlist(this, "features");
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
        if (result && notNullOrUndefined(toBeMatched.features)) {
            result = result && matchElementList(this.features, toBeMatched.features);
        }
        return result;
    }
}
//# sourceMappingURL=Classifier.js.map
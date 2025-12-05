import { LanguageEntity } from "./internal.js";
export class DataType extends LanguageEntity {
    constructor(id) {
        super(id);
        this.$typename = "DataType";
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
        return result;
    }
}
//# sourceMappingURL=DataType.js.map
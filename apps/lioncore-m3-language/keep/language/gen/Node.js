import { MobxModelElementImpl, FreUtils } from "@freon4dsl/core";
import { makeObservable, action } from "mobx";
export class Node extends MobxModelElementImpl {
    constructor(id) {
        super();
        this.$typename = "Node";
        this.$id = "";
        if (!!id) {
            this.$id = id;
        }
        else {
            this.$id = FreUtils.ID();
        }
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
        return result;
    }
}
//# sourceMappingURL=Node.js.map
import { BoxUtil, FreBoxProvider, BoolDisplay, FreNodeReference, BoxFactory, } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class ContainmentBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "widgets", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Containment";
    }
    getContent(projectionName) {
        if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
            const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
            if (!!BOX) {
                return BOX;
            }
        }
        else {
            if (projectionName === "textual") {
                return this.getTextual();
            }
            else if (projectionName === "widgets") {
                return this.getWidgets();
            }
            else if (projectionName === "default") {
                return this.getDefault();
            }
        }
        return this.getDefault();
    }
    getTextual() {
        return BoxFactory.horizontalLayout(this._node, "Containment-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
            BoxUtil.labelBox(this._node, "containment", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "Classifier")
                    : FreNodeReference.create(selected, "Classifier");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
            BoxUtil.booleanBox(this._node, "multiple", { yes: "*", no: "1", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
        ], { selectable: false });
    }
    getWidgets() {
        return BoxFactory.horizontalLayout(this._node, "Containment-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.INNER_SWITCH),
            BoxUtil.labelBox(this._node, "containment", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "Classifier")
                    : FreNodeReference.create(selected, "Classifier");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
            BoxUtil.booleanBox(this._node, "multiple", { yes: "*", no: "1", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
        ], { selectable: false });
    }
    getDefault() {
        return BoxFactory.horizontalLayout(this._node, "Containment-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
            BoxUtil.labelBox(this._node, "containment", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "Classifier")
                    : FreNodeReference.create(selected, "Classifier");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
            BoxUtil.booleanBox(this._node, "multiple", { yes: "*", no: "1", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
        ], { selectable: false });
    }
}
//# sourceMappingURL=ContainmentBoxProvider.js.map
import { BoxUtil, FreBoxProvider, BoolDisplay, FreNodeReference, BoxFactory, } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class PropertyBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "widgets", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Property";
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
        return BoxFactory.horizontalLayout(this._node, "Property-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
            BoxUtil.labelBox(this._node, "property", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "DataType")
                    : FreNodeReference.create(selected, "DataType");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
        ], { selectable: false });
    }
    getWidgets() {
        return BoxFactory.horizontalLayout(this._node, "Property-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
            BoxUtil.labelBox(this._node, "property", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "DataType")
                    : FreNodeReference.create(selected, "DataType");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
        ], { selectable: false });
    }
    getDefault() {
        return BoxFactory.horizontalLayout(this._node, "Property-hlist-line-0", "", [
            BoxUtil.booleanBox(this._node, "optional", { yes: "optional", no: "mandatory", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
            BoxUtil.labelBox(this._node, "property", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-3"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, "):", "top-1-line-0-item-5"),
            BoxUtil.referenceBox(this._node, "type", (selected) => {
                const ref = typeof selected === "string"
                    ? FreNodeReference.create(selected, "DataType")
                    : FreNodeReference.create(selected, "DataType");
                this._node.type = ref;
            }, LanguageEnvironment.getInstance().scoper),
        ], { selectable: false });
    }
}
//# sourceMappingURL=PropertyBoxProvider.js.map
import { BoxUtil, FreBoxProvider, BoxFactory } from "@freon4dsl/core";
export class PrimitiveTypeBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "PrimitiveType";
    }
    getContent(projectionName) {
        if (!this.knownBoxProjections.includes(projectionName) && !this.knownTableProjections.includes(projectionName)) {
            const BOX = this.mainHandler.executeCustomProjection(this._node, projectionName);
            if (!!BOX) {
                return BOX;
            }
        }
        else {
            if (projectionName === "default") {
                return this.getDefault();
            }
        }
        return this.getDefault();
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "PrimitiveType-overall", "", [
            BoxFactory.horizontalLayout(this._node, "PrimitiveType-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "PrimitiveType", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-2"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "PrimitiveType-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.labelBox(this._node, "}", "top-1-line-2-item-0"),
        ], { cssClass: "PrimitiveType" });
    }
}
//# sourceMappingURL=PrimitiveTypeBoxProvider.js.map
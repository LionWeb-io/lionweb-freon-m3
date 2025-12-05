import { BoxUtil, FreBoxProvider, BoxFactory } from "@freon4dsl/core";
export class EnumerationLiteralBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "EnumerationLiteral";
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
            else if (projectionName === "default") {
                return this.getDefault();
            }
        }
        return this.getDefault();
    }
    getTextual() {
        return BoxFactory.horizontalLayout(this._node, "EnumerationLiteral-hlist-line-0", "", [
            BoxUtil.textBox(this._node, "name"),
            BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-1"),
            BoxUtil.textBox(this._node, "key"),
            BoxUtil.labelBox(this._node, ")", "top-1-line-0-item-3"),
        ], { selectable: false });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "EnumerationLiteral-overall", "", [
            BoxFactory.horizontalLayout(this._node, "EnumerationLiteral-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "EnumerationLiteral", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-2"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "EnumerationLiteral-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.labelBox(this._node, "}", "top-1-line-2-item-0"),
        ], { cssClass: "EnumerationLiteral" });
    }
}
//# sourceMappingURL=EnumerationLiteralBoxProvider.js.map
import { BoxUtil, FreBoxProvider, BoxFactory, FreListInfo } from "@freon4dsl/core";
export class EnumerationBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Enumeration";
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
        return BoxFactory.verticalLayout(this._node, "Enumeration-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Enumeration-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "enumeration", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "(", "top-1-line-0-item-2"),
                BoxUtil.textBox(this._node, "key"),
                BoxUtil.labelBox(this._node, ")", "top-1-line-0-item-4"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxUtil.verticalPartListBox(this._node, this._node.literals, "literals", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Enumeration" });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "Enumeration-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Enumeration-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "Enumeration", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-2"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Enumeration-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxUtil.labelBox(this._node, "literals", "top-1-line-2-item-0")),
            BoxUtil.indentBox(this._node, 8, "3", BoxUtil.verticalPartListBox(this._node, this._node.literals, "literals", FreListInfo.NullListInfo, this.mainHandler)),
            BoxUtil.labelBox(this._node, "}", "top-1-line-4-item-0"),
        ], { cssClass: "Enumeration" });
    }
}
//# sourceMappingURL=EnumerationBoxProvider.js.map
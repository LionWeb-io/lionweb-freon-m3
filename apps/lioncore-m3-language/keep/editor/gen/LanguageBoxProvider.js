import { BoxUtil, FreBoxProvider, BoxFactory, FreListInfo } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class LanguageBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Language";
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
        return BoxFactory.verticalLayout(this._node, "Language-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "language", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "key", "top-1-line-0-item-2"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "version", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "version"),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-2", "", [
                BoxUtil.labelBox(this._node, "depends on languages:", "top-1-line-2-item-0"),
                BoxUtil.verticalReferenceListBox(this._node, "dependsOn", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
            ], { selectable: false }),
            BoxUtil.emptyLineBox(this._node, "Language-empty-line-3"),
            BoxUtil.verticalPartListBox(this._node, this._node.entities, "entities", FreListInfo.NullListInfo, this.mainHandler),
        ], { cssClass: "Language" });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "Language-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "language", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "key", "top-1-line-0-item-2"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "version", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "version"),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Language-hlist-line-2", "", [
                BoxUtil.labelBox(this._node, "depends on languages:", "top-1-line-2-item-0"),
                BoxUtil.verticalReferenceListBox(this._node, "dependsOn", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
            ], { selectable: false }),
            BoxUtil.emptyLineBox(this._node, "Language-empty-line-3"),
            BoxUtil.partListReplacerBox(this._node, this._node.entities, "entities", "ExternalAccordion", this.mainHandler),
        ], { cssClass: "Language" });
    }
}
//# sourceMappingURL=LanguageBoxProvider.js.map
import { BoxUtil, FreBoxProvider, FreListInfo, BoxFactory } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class InterfaceBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "widgets", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Interface";
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
        return BoxFactory.verticalLayout(this._node, "Interface-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "interface", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends && this._node.extends.length !== 0, BoxFactory.horizontalLayout(this._node, "Interface-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "extends", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-3"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Interface" });
    }
    getWidgets() {
        return BoxFactory.verticalLayout(this._node, "Interface-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "interface", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends && this._node.extends.length !== 0, BoxFactory.horizontalLayout(this._node, "Interface-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "extends", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-3"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Interface" });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "Interface-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "interface", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends && this._node.extends.length !== 0, BoxFactory.horizontalLayout(this._node, "Interface-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "extends", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-3"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Interface-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Interface" });
    }
}
//# sourceMappingURL=InterfaceBoxProvider.js.map
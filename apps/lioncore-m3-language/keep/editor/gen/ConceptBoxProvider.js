import { BoxUtil, FreBoxProvider, BoolDisplay, BoxFactory, FreNodeReference, FreListInfo, FragmentBox, } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class ConceptBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "widgets", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Concept";
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
        return BoxFactory.verticalLayout(this._node, "Concept-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-0", "", [
                BoxUtil.booleanBox(this._node, "abstract", { yes: "abstract", no: "concrete", unknown: "undefined-undefined" }, BoolDisplay.SELECT),
                BoxUtil.labelBox(this._node, "concept", "top-1-line-0-item-1"),
                BoxUtil.textBox(this._node, "name"),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends, BoxFactory.horizontalLayout(this._node, "Concept-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.referenceBox(this._node, "extends", (selected) => {
                        const ref = typeof selected === "string"
                            ? FreNodeReference.create(selected, "Concept")
                            : FreNodeReference.create(selected, "Concept");
                        this._node.extends = ref;
                    }, LanguageEnvironment.getInstance().scoper),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxFactory.optional2(this._node, "optional-implements", () => !!this._node.implements && this._node.implements.length !== 0, BoxFactory.horizontalLayout(this._node, "Concept-optional-implements-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "implements", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-implements", "implements")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-5"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-2", "", [
                BoxUtil.labelBox(this._node, "partition:", "top-1-line-2-item-0"),
                BoxUtil.booleanBox(this._node, "partition", { yes: "true", no: "false", unknown: "unknown" }, BoolDisplay.SELECT),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "3", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
            BoxUtil.labelBox(this._node, "}", "top-1-line-4-item-0"),
        ], { cssClass: "Concept" });
    }
    getWidgets() {
        return BoxFactory.verticalLayout(this._node, "Concept-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-0", "", [
                BoxUtil.booleanBox(this._node, "abstract", { yes: "abstract", no: "concrete", unknown: "undefined-undefined" }, BoolDisplay.INNER_SWITCH),
                BoxUtil.labelBox(this._node, "concept", "top-1-line-0-item-1"),
                BoxUtil.textBox(this._node, "name"),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends, BoxFactory.horizontalLayout(this._node, "Concept-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.referenceBox(this._node, "extends", (selected) => {
                        const ref = typeof selected === "string"
                            ? FreNodeReference.create(selected, "Concept")
                            : FreNodeReference.create(selected, "Concept");
                        this._node.extends = ref;
                    }, LanguageEnvironment.getInstance().scoper),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxFactory.optional2(this._node, "optional-implements", () => !!this._node.implements && this._node.implements.length !== 0, BoxFactory.horizontalLayout(this._node, "Concept-optional-implements-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "implements", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-implements", "implements")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-5"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-2", "", [
                BoxUtil.labelBox(this._node, "partition:", "top-1-line-2-item-0"),
                BoxUtil.booleanBox(this._node, "partition", { yes: "true", no: "false", unknown: "unknown" }, BoolDisplay.SWITCH),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "3", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
            BoxUtil.labelBox(this._node, "}", "top-1-line-4-item-0"),
        ], { cssClass: "Concept" });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "Concept-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "concept", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                this.getFragmentBox_Base(),
                this.getFragmentBox_Toggles(),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxFactory.horizontalLayout(this._node, "Concept-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "key:", "top-1-line-1-item-0"),
                BoxUtil.textBox(this._node, "key"),
            ], { selectable: false })),
            BoxUtil.indentBox(this._node, 4, "2", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Concept" });
    }
    getFragmentBox_Base() {
        return new FragmentBox(this._node, "Concept-fragment-Base", BoxFactory.verticalLayout(this._node, "Concept-fragment-Base-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Concept-fragment-Base-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "extends", "top-1-line-0-item-0"),
                BoxUtil.referenceBox(this._node, "extends", (selected) => {
                    const ref = typeof selected === "string"
                        ? FreNodeReference.create(selected, "Concept")
                        : FreNodeReference.create(selected, "Concept");
                    this._node.extends = ref;
                }, LanguageEnvironment.getInstance().scoper),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Concept-fragment-Base-hlist-line-1", "", [
                BoxUtil.labelBox(this._node, "implements", "top-1-line-1-item-0"),
                BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
            ], { selectable: false }),
        ], { cssClass: "Concept-fragment-Base" }), { cssClass: "Concept-fragment-Base" });
    }
    getFragmentBox_Toggles() {
        return new FragmentBox(this._node, "Concept-fragment-Toggles", BoxFactory.verticalLayout(this._node, "Concept-fragment-Toggles-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Concept-fragment-Toggles-hlist-line-0", "", [
                BoxUtil.booleanBox(this._node, "abstract", { yes: "true", no: "false", unknown: "unknown" }, BoolDisplay.CHECKBOX),
                BoxUtil.labelBox(this._node, "abstract", "top-1-line-0-item-1"),
            ], { selectable: false }),
            BoxFactory.horizontalLayout(this._node, "Concept-fragment-Toggles-hlist-line-1", "", [
                BoxUtil.booleanBox(this._node, "partition", { yes: "true", no: "false", unknown: "unknown" }, BoolDisplay.CHECKBOX),
                BoxUtil.labelBox(this._node, "partition", "top-1-line-1-item-1"),
            ], { selectable: false }),
        ], { cssClass: "Concept-fragment-Toggles" }), { cssClass: "Concept-fragment-Toggles" });
    }
}
//# sourceMappingURL=ConceptBoxProvider.js.map
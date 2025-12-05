import { BoxUtil, FreBoxProvider, FreNodeReference, BoxFactory, FreListInfo, } from "@freon4dsl/core";
import { LanguageEnvironment } from "../../index.js";
export class AnnotationBoxProvider extends FreBoxProvider {
    constructor(mainHandler) {
        super(mainHandler);
        this.knownBoxProjections = ["textual", "widgets", "default"];
        this.knownTableProjections = ["default"];
        this.conceptName = "Annotation";
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
        return BoxFactory.verticalLayout(this._node, "Annotation-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Annotation-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "annotation", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "annotates", "top-1-line-0-item-2"),
                BoxUtil.referenceBox(this._node, "annotates", (selected) => {
                    const ref = typeof selected === "string"
                        ? FreNodeReference.create(selected, "Classifier")
                        : FreNodeReference.create(selected, "Classifier");
                    this._node.annotates = ref;
                }, LanguageEnvironment.getInstance().scoper),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends, BoxFactory.horizontalLayout(this._node, "Annotation-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.referenceBox(this._node, "extends", (selected) => {
                        const ref = typeof selected === "string"
                            ? FreNodeReference.create(selected, "Annotation")
                            : FreNodeReference.create(selected, "Annotation");
                        this._node.extends = ref;
                    }, LanguageEnvironment.getInstance().scoper),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxFactory.optional2(this._node, "optional-implements", () => !!this._node.implements && this._node.implements.length !== 0, BoxFactory.horizontalLayout(this._node, "Annotation-optional-implements-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "implements", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-implements", "implements")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-6"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Annotation" });
    }
    getWidgets() {
        return BoxFactory.verticalLayout(this._node, "Annotation-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Annotation-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "annotation", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "annotates", "top-1-line-0-item-2"),
                BoxUtil.referenceBox(this._node, "annotates", (selected) => {
                    const ref = typeof selected === "string"
                        ? FreNodeReference.create(selected, "Classifier")
                        : FreNodeReference.create(selected, "Classifier");
                    this._node.annotates = ref;
                }, LanguageEnvironment.getInstance().scoper),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends, BoxFactory.horizontalLayout(this._node, "Annotation-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.referenceBox(this._node, "extends", (selected) => {
                        const ref = typeof selected === "string"
                            ? FreNodeReference.create(selected, "Annotation")
                            : FreNodeReference.create(selected, "Annotation");
                        this._node.extends = ref;
                    }, LanguageEnvironment.getInstance().scoper),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxFactory.optional2(this._node, "optional-implements", () => !!this._node.implements && this._node.implements.length !== 0, BoxFactory.horizontalLayout(this._node, "Annotation-optional-implements-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "implements", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-implements", "implements")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-6"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler)),
        ], { cssClass: "Annotation" });
    }
    getDefault() {
        return BoxFactory.verticalLayout(this._node, "Annotation-overall", "", [
            BoxFactory.horizontalLayout(this._node, "Annotation-hlist-line-0", "", [
                BoxUtil.labelBox(this._node, "annotation", "top-1-line-0-item-0"),
                BoxUtil.textBox(this._node, "name"),
                BoxUtil.labelBox(this._node, "annotates", "top-1-line-0-item-2"),
                BoxUtil.referenceBox(this._node, "annotates", (selected) => {
                    const ref = typeof selected === "string"
                        ? FreNodeReference.create(selected, "Classifier")
                        : FreNodeReference.create(selected, "Classifier");
                    this._node.annotates = ref;
                }, LanguageEnvironment.getInstance().scoper),
                BoxFactory.optional2(this._node, "optional-extends", () => !!this._node.extends, BoxFactory.horizontalLayout(this._node, "Annotation-optional-extends-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "extends", "top-2-line-0-item-0"),
                    BoxUtil.referenceBox(this._node, "extends", (selected) => {
                        const ref = typeof selected === "string"
                            ? FreNodeReference.create(selected, "Annotation")
                            : FreNodeReference.create(selected, "Annotation");
                        this._node.extends = ref;
                    }, LanguageEnvironment.getInstance().scoper),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-extends", "extends")),
                BoxFactory.optional2(this._node, "optional-implements", () => !!this._node.implements && this._node.implements.length !== 0, BoxFactory.horizontalLayout(this._node, "Annotation-optional-implements-hlist-line-0", "", [
                    BoxUtil.labelBox(this._node, "implements", "top-2-line-0-item-0"),
                    BoxUtil.verticalReferenceListBox(this._node, "implements", LanguageEnvironment.getInstance().scoper, FreListInfo.NullListInfo),
                ], { selectable: false }), false, BoxFactory.action(this._node, "optional-implements", "implements")),
                BoxUtil.labelBox(this._node, "\{", "top-1-line-0-item-6"),
            ], { selectable: false }),
            BoxUtil.indentBox(this._node, 4, "1", BoxUtil.partListWrapperBox(this._node, "features", "ECollapsible", BoxUtil.verticalPartListBox(this._node, this._node.features, "features", FreListInfo.NullListInfo, this.mainHandler))),
        ], { cssClass: "Annotation" });
    }
}
//# sourceMappingURL=AnnotationBoxProvider.js.map
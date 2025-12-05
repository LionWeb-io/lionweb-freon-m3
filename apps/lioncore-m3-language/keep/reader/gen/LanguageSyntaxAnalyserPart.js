import { Language, Enumeration, EnumerationLiteral, PrimitiveType, Annotation, Containment, Reference, Property, Concept, Interface, } from "../../language/gen/index.js";
import { PrimValueType } from "./LionCore_M3SyntaxAnalyser.js";
export class LanguageSyntaxAnalyserPart {
    constructor(mainAnalyser) {
        this.mainAnalyser = mainAnalyser;
    }
    transformLanguage(nodeInfo, children, sentence) {
        let __name;
        let __key;
        let __version;
        let __dependsOn;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[3], PrimValueType.string);
        __version = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[5], PrimValueType.string);
        __dependsOn = this.mainAnalyser.transformRefList(children.asJsReadonlyArrayView()[9], "Language");
        return Language.create({
            name: __name,
            key: __key,
            version: __version,
            dependsOn: __dependsOn,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformEnumeration(nodeInfo, children, sentence) {
        let __name;
        let __key;
        let __literals;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        __literals = children.asJsReadonlyArrayView()[6].asJsReadonlyArrayView();
        return Enumeration.create({
            name: __name,
            key: __key,
            literals: __literals,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformEnumerationLiteral(nodeInfo, children, sentence) {
        let __name;
        let __key;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        return EnumerationLiteral.create({
            name: __name,
            key: __key,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformPrimitiveType(nodeInfo, children, sentence) {
        let __name;
        let __key;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        return PrimitiveType.create({
            name: __name,
            key: __key,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformAnnotation(nodeInfo, children, sentence) {
        let __name;
        let __annotates;
        let __extends;
        let __implements;
        let __features;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        if (!!children.asJsReadonlyArrayView()[3]) {
            __annotates = this.mainAnalyser.makeFreNodeRef(children.asJsReadonlyArrayView()[3], "Classifier");
        }
        if (!!children.asJsReadonlyArrayView()[4]) {
            const _optGroup = children.asJsReadonlyArrayView()[4];
            __extends = this.mainAnalyser.makeFreNodeRef(_optGroup.asJsReadonlyArrayView()[1], "Annotation");
        }
        if (!!children.asJsReadonlyArrayView()[5]) {
            const _optGroup = children.asJsReadonlyArrayView()[5];
            __implements = this.mainAnalyser.transformRefList(_optGroup.asJsReadonlyArrayView()[1], "Interface");
        }
        __features = children.asJsReadonlyArrayView()[7].asJsReadonlyArrayView();
        return Annotation.create({
            name: __name,
            annotates: __annotates,
            extends: __extends,
            implements: __implements,
            features: __features,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformContainment(nodeInfo, children, sentence) {
        let __optional;
        let __name;
        let __key;
        let __type;
        let __multiple;
        if (children.asJsReadonlyArrayView()[0] === "optional") {
            __optional = true;
        }
        else if (children.asJsReadonlyArrayView()[0] === "mandatory") {
            __optional = false;
        }
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[2], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        __type = this.mainAnalyser.makeFreNodeRef(children.asJsReadonlyArrayView()[6], "Classifier");
        if (children.asJsReadonlyArrayView()[7] === "*") {
            __multiple = true;
        }
        else if (children.asJsReadonlyArrayView()[7] === "1") {
            __multiple = false;
        }
        return Containment.create({
            optional: __optional,
            name: __name,
            key: __key,
            type: __type,
            multiple: __multiple,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformReference(nodeInfo, children, sentence) {
        let __optional;
        let __name;
        let __key;
        let __type;
        let __multiple;
        if (children.asJsReadonlyArrayView()[0] === "optional") {
            __optional = true;
        }
        else if (children.asJsReadonlyArrayView()[0] === "mandatory") {
            __optional = false;
        }
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[2], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        __type = this.mainAnalyser.makeFreNodeRef(children.asJsReadonlyArrayView()[6], "Classifier");
        if (children.asJsReadonlyArrayView()[7] === "*") {
            __multiple = true;
        }
        else if (children.asJsReadonlyArrayView()[7] === "1") {
            __multiple = false;
        }
        return Reference.create({
            optional: __optional,
            name: __name,
            key: __key,
            type: __type,
            multiple: __multiple,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformProperty(nodeInfo, children, sentence) {
        let __optional;
        let __name;
        let __key;
        let __type;
        if (children.asJsReadonlyArrayView()[0] === "optional") {
            __optional = true;
        }
        else if (children.asJsReadonlyArrayView()[0] === "mandatory") {
            __optional = false;
        }
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[2], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[4], PrimValueType.string);
        __type = this.mainAnalyser.makeFreNodeRef(children.asJsReadonlyArrayView()[6], "DataType");
        return Property.create({
            optional: __optional,
            name: __name,
            key: __key,
            type: __type,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformConcept(nodeInfo, children, sentence) {
        let __name;
        let __key;
        let __features;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[3], PrimValueType.string);
        __features = children.asJsReadonlyArrayView()[4].asJsReadonlyArrayView();
        return Concept.create({
            name: __name,
            key: __key,
            features: __features,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformInterface(nodeInfo, children, sentence) {
        let __name;
        let __extends;
        let __key;
        let __features;
        __name = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[1], PrimValueType.identifier);
        if (!!children.asJsReadonlyArrayView()[2]) {
            const _optGroup = children.asJsReadonlyArrayView()[2];
            __extends = this.mainAnalyser.transformRefList(_optGroup.asJsReadonlyArrayView()[1], "Interface");
        }
        __key = this.mainAnalyser.transformPrimValue(children.asJsReadonlyArrayView()[5], PrimValueType.string);
        __features = children.asJsReadonlyArrayView()[6].asJsReadonlyArrayView();
        return Interface.create({
            name: __name,
            extends: __extends,
            key: __key,
            features: __features,
            parseLocation: this.mainAnalyser.location(sentence, nodeInfo.node),
        });
    }
    transformLanguageEntity(nodeInfo, children, sentence) {
        return children.asJsReadonlyArrayView()[0];
    }
    transformDataType(nodeInfo, children, sentence) {
        return children.asJsReadonlyArrayView()[0];
    }
    transformClassifier(nodeInfo, children, sentence) {
        return children.asJsReadonlyArrayView()[0];
    }
    transformFeature(nodeInfo, children, sentence) {
        return children.asJsReadonlyArrayView()[0];
    }
    transformLink(nodeInfo, children, sentence) {
        return children.asJsReadonlyArrayView()[0];
    }
}
//# sourceMappingURL=LanguageSyntaxAnalyserPart.js.map
import { FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { SyntaxAnalyserByMethodRegistrationAbstract, } from "net.akehurst.language-agl-processor";
import { LanguageSyntaxAnalyserPart, LionCore_M3CommonSyntaxAnalyserPart } from "./index.js";
export var PrimValueType;
(function (PrimValueType) {
    PrimValueType[PrimValueType["string"] = 0] = "string";
    PrimValueType[PrimValueType["identifier"] = 1] = "identifier";
    PrimValueType[PrimValueType["boolean"] = 2] = "boolean";
    PrimValueType[PrimValueType["number"] = 3] = "number";
})(PrimValueType || (PrimValueType = {}));
export class ParsedNodeReference {
    constructor(pathname, location) {
        this.pathname = pathname;
        this.parseLocation = location;
    }
    freId() {
        throw new Error("Method not implemented.");
    }
    freLanguageConcept() {
        throw new Error("Method not implemented.");
    }
    freOwner() {
        throw new Error("Method not implemented.");
    }
    freOwnerDescriptor() {
        throw new Error("Method not implemented.");
    }
    freIsModel() {
        throw new Error("Method not implemented.");
    }
    freIsUnit() {
        throw new Error("Method not implemented.");
    }
    freIsExpression() {
        throw new Error("Method not implemented.");
    }
    freIsBinaryExpression() {
        throw new Error("Method not implemented.");
    }
    copy() {
        throw new Error("Method not implemented.");
    }
    match(toBeMatched) {
        throw new Error("Method not implemented.");
    }
    toString() {
        return `ParsedNodeReference: ${this.pathname} [${this.parseLocation.line}:${this.parseLocation.column}]`;
    }
}
export class LionCore_M3SyntaxAnalyser extends SyntaxAnalyserByMethodRegistrationAbstract {
    constructor() {
        super(...arguments);
        this.sourceName = "";
        this._unit_Language_analyser = new LanguageSyntaxAnalyserPart(this);
        this._unit_common_analyser = new LionCore_M3CommonSyntaxAnalyserPart(this);
    }
    registerHandlers() {
        super.registerFor("Language", (n, c, s) => this._unit_Language_analyser.transformLanguage(n, c, s));
        super.registerFor("Enumeration", (n, c, s) => this._unit_Language_analyser.transformEnumeration(n, c, s));
        super.registerFor("EnumerationLiteral", (n, c, s) => this._unit_Language_analyser.transformEnumerationLiteral(n, c, s));
        super.registerFor("PrimitiveType", (n, c, s) => this._unit_Language_analyser.transformPrimitiveType(n, c, s));
        super.registerFor("Annotation", (n, c, s) => this._unit_Language_analyser.transformAnnotation(n, c, s));
        super.registerFor("Containment", (n, c, s) => this._unit_Language_analyser.transformContainment(n, c, s));
        super.registerFor("Reference", (n, c, s) => this._unit_Language_analyser.transformReference(n, c, s));
        super.registerFor("Property", (n, c, s) => this._unit_Language_analyser.transformProperty(n, c, s));
        super.registerFor("Concept", (n, c, s) => this._unit_Language_analyser.transformConcept(n, c, s));
        super.registerFor("Interface", (n, c, s) => this._unit_Language_analyser.transformInterface(n, c, s));
        super.registerFor("LanguageEntity", (n, c, s) => this._unit_Language_analyser.transformLanguageEntity(n, c, s));
        super.registerFor("DataType", (n, c, s) => this._unit_Language_analyser.transformDataType(n, c, s));
        super.registerFor("Classifier", (n, c, s) => this._unit_Language_analyser.transformClassifier(n, c, s));
        super.registerFor("Feature", (n, c, s) => this._unit_Language_analyser.transformFeature(n, c, s));
        super.registerFor("Link", (n, c, s) => this._unit_Language_analyser.transformLink(n, c, s));
        super.registerFor("__fre_reference", (n, c, s) => this.transform__fre_reference(n, c, s));
    }
    transformPrimList(list, primType, separator) {
        let result = [];
        if (!!list) {
            list.forEach((element) => {
                if (element !== null && element !== undefined && element !== separator) {
                    result.push(this.transformPrimValue(element, primType));
                }
            });
        }
        return result;
    }
    transformPrimValue(element, primType) {
        switch (primType) {
            case PrimValueType.number:
                const num = parseFloat(element);
                return (isNaN(num) ? 0 : num);
            case PrimValueType.string:
                return element.replace(/"/g, "");
            case PrimValueType.identifier:
                return element.replace(/`/g, "");
            case PrimValueType.boolean:
                return (element.toLowerCase() === "true");
            default:
                return element;
        }
    }
    transformPartList(list, separator) {
        let result = [];
        if (!!list) {
            for (const element of list.asJsReadonlyArrayView()) {
                if (element !== null && element !== undefined && element !== separator) {
                    result.push(element);
                }
            }
        }
        return result;
    }
    transformRefList(list, typeName) {
        let result = [];
        if (!!list) {
            for (const child of list.asJsReadonlyArrayView()) {
                if (child.constructor.name === "ParsedNodeReference") {
                    result.push(this.makeFreNodeRef(child, typeName));
                }
            }
        }
        return result;
    }
    transform__fre_reference(nodeInfo, children, sentence) {
        let pathname = [];
        for (const child of children.asJsReadonlyArrayView()) {
            if (child !== null && child !== undefined && (typeof child === "string" ? child !== "." : false)) {
                const name = child.toString().replace(/`/g, "");
                pathname.push(name);
            }
        }
        return new ParsedNodeReference(pathname, this.location(sentence, nodeInfo.node));
    }
    makeFreNodeRef(referred, freMetaConcept) {
        const result = FreNodeReference.create(referred.pathname, freMetaConcept);
        result.parseLocation = referred.parseLocation;
        return result;
    }
    transformLimitedList(list) {
        let result = [];
        list.asJsReadonlyArrayView().forEach((xx) => {
            if (xx instanceof FreNodeReference) {
                result.push(xx);
            }
        });
        return result;
    }
    location(sentence, node) {
        const location = sentence.locationFor(node.startPosition, node.nextInputNoSkip - node.startPosition);
        return FreParseLocation.create({
            filename: this.sourceName,
            line: location.line,
            column: location.column,
        });
    }
}
//# sourceMappingURL=LionCore_M3SyntaxAnalyser.js.map
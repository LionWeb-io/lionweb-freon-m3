import { isNullOrUndefined, notNullOrUndefined } from "@freon4dsl/core";
import { Annotation, Concept, Interface, Containment, DataType, Enumeration, EnumerationLiteral, Feature, Classifier, Link, LanguageEntity, PrimitiveType, Property, Reference, Language, } from "../../language/gen/index.js";
var SeparatorType;
(function (SeparatorType) {
    SeparatorType["NONE"] = "NONE";
    SeparatorType["Terminator"] = "Terminator";
    SeparatorType["Separator"] = "Separator";
    SeparatorType["Initiator"] = "Initiator";
})(SeparatorType || (SeparatorType = {}));
export class LionCore_M3ModelUnitWriter {
    constructor() {
        this.output = [];
        this.currentLine = 0;
    }
    writeToString(node, startIndent, short) {
        this.writeToLines(node, startIndent, short);
        return `${this.output
            .map((line) => `${line.trimEnd()}`)
            .join("\n")
            .trimEnd()}`;
    }
    writeToLines(node, startIndent, short) {
        if (startIndent === undefined) {
            startIndent = 0;
        }
        if (short === undefined) {
            short = false;
        }
        this.output = [];
        this.currentLine = 0;
        let indentString = "";
        for (let _i = 0; _i < startIndent; _i++) {
            indentString += " ";
        }
        this.output[this.currentLine] = indentString;
        this.unparse(node, short);
        return this.output;
    }
    writeNameOnly(node) {
        if (isNullOrUndefined(node)) {
            return "";
        }
        if (node instanceof Language) {
            return node.name;
        }
        else if (node instanceof Annotation) {
            return node.name;
        }
        else if (node instanceof Concept) {
            return node.name;
        }
        else if (node instanceof Interface) {
            return node.name;
        }
        else if (node instanceof Containment) {
            return node.name;
        }
        else if (node instanceof DataType) {
            return node.name;
        }
        else if (node instanceof Enumeration) {
            return node.name;
        }
        else if (node instanceof EnumerationLiteral) {
            return node.name;
        }
        else if (node instanceof Feature) {
            return node.name;
        }
        else if (node instanceof Classifier) {
            return node.name;
        }
        else if (node instanceof Link) {
            return node.name;
        }
        else if (node instanceof LanguageEntity) {
            return node.name;
        }
        else if (node instanceof PrimitiveType) {
            return node.name;
        }
        else if (node instanceof Property) {
            return node.name;
        }
        else if (node instanceof Reference) {
            return node.name;
        }
        else {
            this.output = [];
            this.currentLine = 0;
            this.output[this.currentLine] = "";
            this.unparse(node, true);
            return this.output[0].trimEnd();
        }
    }
    unparse(node, short) {
        if (isNullOrUndefined(node)) {
            return;
        }
        switch (node.freLanguageConcept()) {
            case "Node":
                this.unparseNode(node, short);
                break;
            case "Annotation":
                this.unparseAnnotation(node, short);
                break;
            case "Concept":
                this.unparseConcept(node, short);
                break;
            case "Interface":
                this.unparseInterface(node, short);
                break;
            case "Containment":
                this.unparseContainment(node, short);
                break;
            case "DataType":
                this.unparseDataType(node, short);
                break;
            case "Enumeration":
                this.unparseEnumeration(node, short);
                break;
            case "EnumerationLiteral":
                this.unparseEnumerationLiteral(node, short);
                break;
            case "Feature":
                this.unparseFeature(node, short);
                break;
            case "Classifier":
                this.unparseClassifier(node, short);
                break;
            case "Link":
                this.unparseLink(node, short);
                break;
            case "LanguageEntity":
                this.unparseLanguageEntity(node, short);
                break;
            case "PrimitiveType":
                this.unparsePrimitiveType(node, short);
                break;
            case "Property":
                this.unparseProperty(node, short);
                break;
            case "Reference":
                this.unparseReference(node, short);
                break;
            case "Language":
                this.unparseLanguage(node, short);
                break;
            case "INamed":
                this.unparseINamed(node, short);
                break;
            case "IKeyed":
                this.unparseIKeyed(node, short);
                break;
            default:
                console.error("Cannot unparse a " + node.freLanguageConcept());
        }
    }
    unparseLanguage(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `language `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `key `;
        this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `version `;
            this.output[this.currentLine] += notNullOrUndefined(node.version) ? `"${node.version}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `depends on languages: `;
            this._unparseReferenceList(node.dependsOn, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short);
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += "";
            ("");
            this.newlineAndIndentation(blockIndent + 0);
        }
    }
    unparseConcept(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `concept `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `key: `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 4);
            this._unparseList(node.features, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short, (node, short) => this.unparse(node, short));
        }
    }
    unparseInterface(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `interface `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        if (notNullOrUndefined(node.extends && node.extends.length > 0)) {
            this.output[this.currentLine] += `extends `;
            this._unparseReferenceList(node.extends, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short);
        }
        this.output[this.currentLine] += `\{ `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `key: `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 4);
            this._unparseList(node.features, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short, (node, short) => this.unparse(node, short));
        }
    }
    unparseFeature(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `name: `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `key: `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `optional: `;
            this.output[this.currentLine] += notNullOrUndefined(node.optional) ? `${node.optional} ` : `<no-value> `;
        }
    }
    unparseProperty(node, short) {
        if (node.optional) {
            this.output[this.currentLine] += `optional `;
        }
        else {
            this.output[this.currentLine] += notNullOrUndefined(node.optional) ? `mandatory ` : `<no-value> `;
        }
        this.output[this.currentLine] += `property `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `( `;
        this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
        this.output[this.currentLine] += `): `;
        this._unparseReference(node.type, short);
    }
    unparseReference(node, short) {
        if (node.optional) {
            this.output[this.currentLine] += `optional `;
        }
        else {
            this.output[this.currentLine] += notNullOrUndefined(node.optional) ? `mandatory ` : `<no-value> `;
        }
        this.output[this.currentLine] += `reference `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `( `;
        this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
        this.output[this.currentLine] += `): `;
        this._unparseReference(node.type, short);
        if (node.multiple) {
            this.output[this.currentLine] += `* `;
        }
        else {
            this.output[this.currentLine] += notNullOrUndefined(node.multiple) ? `1 ` : `<no-value> `;
        }
    }
    unparseContainment(node, short) {
        if (node.optional) {
            this.output[this.currentLine] += `optional `;
        }
        else {
            this.output[this.currentLine] += notNullOrUndefined(node.optional) ? `mandatory ` : `<no-value> `;
        }
        this.output[this.currentLine] += `containment `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `( `;
        this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
        this.output[this.currentLine] += `): `;
        this._unparseReference(node.type, short);
        if (node.multiple) {
            this.output[this.currentLine] += `* `;
        }
        else {
            this.output[this.currentLine] += notNullOrUndefined(node.multiple) ? `1 ` : `<no-value> `;
        }
    }
    unparseAnnotation(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `annotation `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `annotates `;
        if (notNullOrUndefined(node.annotates)) {
            this._unparseReference(node.annotates, short);
        }
        if (notNullOrUndefined(node.extends)) {
            this.output[this.currentLine] += `extends `;
            this._unparseReference(node.extends, short);
        }
        if (notNullOrUndefined(node.implements && node.implements.length > 0)) {
            this.output[this.currentLine] += `implements `;
            this._unparseReferenceList(node.implements, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short);
        }
        this.output[this.currentLine] += `\{ `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this._unparseList(node.features, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short, (node, short) => this.unparse(node, short));
        }
    }
    unparseEnumeration(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `Enumeration `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `\{ `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `key `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `literals `;
            this.newlineAndIndentation(blockIndent + 8);
            this._unparseList(node.literals, "", SeparatorType.Separator, true, this.output[this.currentLine].length, short, (node, short) => this.unparse(node, short));
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `} `;
        }
    }
    unparseEnumerationLiteral(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `EnumerationLiteral `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `\{ `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `key `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `} `;
        }
    }
    unparsePrimitiveType(node, short) {
        const blockIndent = this.output[this.currentLine].length;
        this.output[this.currentLine] += `PrimitiveType `;
        this.output[this.currentLine] += `\`${node.name}\` `;
        this.output[this.currentLine] += `\{ `;
        if (!short) {
            this.newlineAndIndentation(blockIndent + 4);
            this.output[this.currentLine] += `key `;
            this.output[this.currentLine] += notNullOrUndefined(node.key) ? `"${node.key}" ` : `""`;
            this.newlineAndIndentation(blockIndent + 0);
            this.output[this.currentLine] += `} `;
        }
    }
    unparseNode(node, short) {
        throw new Error("Method unparseNode should be implemented by its (concrete) subclasses.");
    }
    unparseDataType(node, short) {
        throw new Error("Method unparseDataType should be implemented by its (concrete) subclasses.");
    }
    unparseClassifier(node, short) {
        throw new Error("Method unparseClassifier should be implemented by its (concrete) subclasses.");
    }
    unparseLink(node, short) {
        throw new Error("Method unparseLink should be implemented by its (concrete) subclasses.");
    }
    unparseLanguageEntity(node, short) {
        throw new Error("Method unparseLanguageEntity should be implemented by its (concrete) subclasses.");
    }
    unparseINamed(node, short) {
        throw new Error("Method unparseINamed should be implemented by the classes that implement it.");
    }
    unparseIKeyed(node, short) {
        throw new Error("Method unparseIKeyed should be implemented by the classes that implement it.");
    }
    _unparseReference(node, short) {
        if (notNullOrUndefined(node)) {
            const type = node?.referred;
            if (notNullOrUndefined(type)) {
                this.output[this.currentLine] += node.pathname.map((s) => "`" + s + "`").join(".") + " ";
            }
            else {
                this.output[this.currentLine] += node.pathname.map((s) => "`" + s + "`").join(".") + " ";
            }
        }
    }
    _unparseList(list, sepText, sepType, vertical, indent, short, method) {
        list.forEach((listElem, index) => {
            const isLastInList = index === list.length - 1;
            this.doInitiator(sepText, sepType);
            method(listElem, short);
            this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
        });
    }
    _unparseReferenceList(list, sepText, sepType, vertical, indent, short) {
        list.forEach((listElem, index) => {
            const isLastInList = index === list.length - 1;
            this.doInitiator(sepText, sepType);
            this._unparseReference(listElem, short);
            this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
        });
    }
    _unparseListOfPrimitiveValues(list, isIdentifier, sepText, sepType, vertical, indent, short) {
        if (notNullOrUndefined(list)) {
            list.forEach((listElem, index) => {
                const isLastInList = index === list.length - 1;
                this.doInitiator(sepText, sepType);
                if (typeof listElem === "string" && !isIdentifier) {
                    this.output[this.currentLine] += `"${listElem}"`;
                }
                else if (typeof listElem === "string" && isIdentifier) {
                    this.output[this.currentLine] += `\`${listElem}\``;
                }
                else {
                    this.output[this.currentLine] += `${listElem}`;
                }
                this.doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent);
            });
        }
    }
    doSeparatorOrTerminatorAndNewline(sepType, isLastInList, sepText, vertical, short, indent) {
        this.output[this.currentLine] = this.output[this.currentLine].trimEnd();
        if (!vertical && (!sepText || sepText.length == 0)) {
            sepText = " ";
        }
        switch (sepType) {
            case SeparatorType.Separator: {
                if (!isLastInList) {
                    this.output[this.currentLine] += sepText;
                }
                break;
            }
            case SeparatorType.Terminator: {
                this.output[this.currentLine] += sepText;
                break;
            }
            case SeparatorType.Initiator: {
                break;
            }
            case SeparatorType.NONE: {
                if (!vertical) {
                    this.output[this.currentLine] += " ";
                }
                break;
            }
        }
        if (vertical && !isLastInList) {
            if (!short) {
                this.newlineAndIndentation(indent);
            }
            else {
                this.output[this.currentLine] += ` ...`;
            }
        }
        else if (isLastInList) {
            if (this.output[this.currentLine][this.output[this.currentLine].length - 1] !== " ") {
                this.output[this.currentLine] += ` `;
            }
        }
    }
    newlineAndIndentation(indent) {
        this.currentLine += 1;
        let indentation = "";
        for (let _i = 0; _i < indent; _i++) {
            indentation += " ";
        }
        this.output[this.currentLine] = indentation;
    }
    doInitiator(sepText, sepType) {
        if (sepType === SeparatorType.Initiator) {
            const nrOfWhiteSpaces = this.output[this.currentLine].split("").filter((char) => /\s/.test(char)).length;
            const onlyIndentation = this.output[this.currentLine].length === nrOfWhiteSpaces;
            if (onlyIndentation) {
                this.output[this.currentLine] += sepText;
            }
            else {
                this.output[this.currentLine] += " " + sepText;
            }
        }
    }
}
//# sourceMappingURL=LionCore_M3ModelUnitWriter.js.map
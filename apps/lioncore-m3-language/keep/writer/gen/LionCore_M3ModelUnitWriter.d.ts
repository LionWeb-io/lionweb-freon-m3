import { type FreWriter, type FreNode } from "@freon4dsl/core";
export declare class LionCore_M3ModelUnitWriter implements FreWriter {
    output: string[];
    currentLine: number;
    writeToString(node: FreNode, startIndent?: number, short?: boolean): string;
    writeToLines(node: FreNode, startIndent?: number, short?: boolean): string[];
    writeNameOnly(node: FreNode | undefined): string;
    private unparse;
    private unparseLanguage;
    private unparseConcept;
    private unparseInterface;
    private unparseFeature;
    private unparseProperty;
    private unparseReference;
    private unparseContainment;
    private unparseAnnotation;
    private unparseEnumeration;
    private unparseEnumerationLiteral;
    private unparsePrimitiveType;
    private unparseNode;
    private unparseDataType;
    private unparseClassifier;
    private unparseLink;
    private unparseLanguageEntity;
    private unparseINamed;
    private unparseIKeyed;
    private _unparseReference;
    private _unparseList;
    private _unparseReferenceList;
    private _unparseListOfPrimitiveValues;
    private doSeparatorOrTerminatorAndNewline;
    private newlineAndIndentation;
    private doInitiator;
}
//# sourceMappingURL=LionCore_M3ModelUnitWriter.d.ts.map
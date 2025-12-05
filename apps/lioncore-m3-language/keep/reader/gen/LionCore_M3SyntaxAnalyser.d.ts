import { FreParseLocation, type FreNamedNode, type FreNode, FreNodeReference, type FreOwnerDescriptor } from "@freon4dsl/core";
import { LionCore_M3 } from "../../language/gen/index.js";
import { SyntaxAnalyserByMethodRegistrationAbstract, type KtList, type Sentence, type SpptDataNodeInfo, type SpptDataNode } from "net.akehurst.language-agl-processor";
export declare enum PrimValueType {
    "string" = 0,
    "identifier" = 1,
    "boolean" = 2,
    "number" = 3
}
export declare class ParsedNodeReference implements FreNode {
    pathname: string[];
    parseLocation: FreParseLocation;
    constructor(pathname: string[], location: FreParseLocation);
    freId(): string;
    freLanguageConcept(): string;
    freOwner(): FreNode;
    freOwnerDescriptor(): FreOwnerDescriptor;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): FreNode;
    match(toBeMatched: Partial<FreNode>): boolean;
    toString(): string;
}
export declare class LionCore_M3SyntaxAnalyser extends SyntaxAnalyserByMethodRegistrationAbstract<LionCore_M3> {
    sourceName: string;
    private _unit_Language_analyser;
    private _unit_common_analyser;
    registerHandlers(): void;
    transformPrimList<T extends string | number | boolean>(list: string[], primType: PrimValueType, separator?: string): T[];
    transformPrimValue<T extends string | number | boolean>(element: string, primType: PrimValueType): T;
    transformPartList<T>(list: KtList<T>, separator?: string): T[];
    transformRefList<T extends FreNamedNode>(list: KtList<T>, typeName: string): FreNodeReference<T>[];
    transform__fre_reference(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): ParsedNodeReference;
    makeFreNodeRef<T extends FreNamedNode>(referred: ParsedNodeReference, freMetaConcept: string): FreNodeReference<T>;
    transformLimitedList<T extends FreNamedNode>(list: KtList<any>): FreNodeReference<T>[];
    location(sentence: Sentence, node: SpptDataNode): FreParseLocation;
}
//# sourceMappingURL=LionCore_M3SyntaxAnalyser.d.ts.map
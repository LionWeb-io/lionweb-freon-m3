import { MobxModelElementImpl, type FreNode, FreParseLocation } from "@freon4dsl/core";
export declare abstract class Node extends MobxModelElementImpl implements FreNode {
    readonly $typename: string;
    $id: string;
    parseLocation: FreParseLocation | undefined;
    constructor(id?: string);
    freLanguageConcept(): string;
    freId(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    abstract copy(): Node;
    match(toBeMatched: Partial<Node>): boolean;
}
//# sourceMappingURL=Node.d.ts.map
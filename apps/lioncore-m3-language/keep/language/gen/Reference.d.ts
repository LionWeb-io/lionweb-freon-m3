import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { Link } from "./internal.js";
export declare class Reference extends Link implements FreNode {
    static create(data: Partial<Reference>): Reference;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Reference;
    match(toBeMatched: Partial<Reference>): boolean;
}
//# sourceMappingURL=Reference.d.ts.map
import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { DataType } from "./internal.js";
export declare class PrimitiveType extends DataType implements FreNode {
    static create(data: Partial<PrimitiveType>): PrimitiveType;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): PrimitiveType;
    match(toBeMatched: Partial<PrimitiveType>): boolean;
}
//# sourceMappingURL=PrimitiveType.d.ts.map
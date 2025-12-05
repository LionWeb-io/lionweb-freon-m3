import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { DataType, EnumerationLiteral } from "./internal.js";
export declare class Enumeration extends DataType implements FreNode {
    static create(data: Partial<Enumeration>): Enumeration;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    literals: EnumerationLiteral[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Enumeration;
    match(toBeMatched: Partial<Enumeration>): boolean;
}
//# sourceMappingURL=Enumeration.d.ts.map
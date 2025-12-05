import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { LanguageEntity } from "./internal.js";
export declare abstract class DataType extends LanguageEntity implements FreNode {
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    abstract copy(): DataType;
    match(toBeMatched: Partial<DataType>): boolean;
}
//# sourceMappingURL=DataType.d.ts.map
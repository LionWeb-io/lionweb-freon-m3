import { type FreNode, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { Feature, DataType } from "./internal.js";
export declare class Property extends Feature implements FreNode {
    static create(data: Partial<Property>): Property;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    type: FreNodeReference<DataType>;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Property;
    match(toBeMatched: Partial<Property>): boolean;
    get $type(): DataType | undefined;
}
//# sourceMappingURL=Property.d.ts.map
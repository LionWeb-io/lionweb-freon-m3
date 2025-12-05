import { MobxModelElementImpl, type FreNamedNode, FreParseLocation } from "@freon4dsl/core";
import { type IKeyed } from "./internal.js";
export declare class EnumerationLiteral extends MobxModelElementImpl implements FreNamedNode, IKeyed {
    static create(data: Partial<EnumerationLiteral>): EnumerationLiteral;
    readonly $typename: string;
    $id: string;
    parseLocation: FreParseLocation | undefined;
    name: string;
    key: string;
    constructor(id?: string);
    freLanguageConcept(): string;
    freId(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): EnumerationLiteral;
    match(toBeMatched: Partial<EnumerationLiteral>): boolean;
}
//# sourceMappingURL=EnumerationLiteral.d.ts.map
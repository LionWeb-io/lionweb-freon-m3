import { MobxModelElementImpl, type FreNamedNode, FreParseLocation } from "@freon4dsl/core";
import { type IKeyed } from "./internal.js";
export declare abstract class Feature extends MobxModelElementImpl implements FreNamedNode, IKeyed {
    readonly $typename: string;
    $id: string;
    parseLocation: FreParseLocation | undefined;
    optional: boolean;
    name: string;
    key: string;
    constructor(id?: string);
    freLanguageConcept(): string;
    freId(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    abstract copy(): Feature;
    match(toBeMatched: Partial<Feature>): boolean;
}
//# sourceMappingURL=Feature.d.ts.map
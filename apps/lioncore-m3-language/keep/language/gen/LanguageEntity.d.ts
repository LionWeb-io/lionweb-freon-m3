import { MobxModelElementImpl, type FreNamedNode, FreParseLocation } from "@freon4dsl/core";
import { type IKeyed } from "./internal.js";
export declare abstract class LanguageEntity extends MobxModelElementImpl implements FreNamedNode, IKeyed {
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
    abstract copy(): LanguageEntity;
    match(toBeMatched: Partial<LanguageEntity>): boolean;
}
//# sourceMappingURL=LanguageEntity.d.ts.map
import { MobxModelElementImpl, type FreModelUnit, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { LanguageEntity, type IKeyed } from "./internal.js";
export declare class Language extends MobxModelElementImpl implements FreModelUnit, IKeyed {
    static create(data: Partial<Language>): Language;
    fileExtension: string;
    readonly $typename: string;
    $id: string;
    parseLocation: FreParseLocation | undefined;
    version: string;
    key: string;
    name: string;
    entities: LanguageEntity[];
    dependsOn: FreNodeReference<Language>[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freId(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Language;
    match(toBeMatched: Partial<Language>): boolean;
}
//# sourceMappingURL=Language.d.ts.map
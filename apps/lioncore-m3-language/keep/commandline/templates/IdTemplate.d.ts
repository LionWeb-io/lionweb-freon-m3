import { FreModelUnit } from "@freon4dsl/core";
export type IdProperty = {
    name: string;
    id: string;
    key: string;
};
export type IdClassifier = {
    name: string;
    id: string;
    key: string;
    properties: IdProperty[];
};
export type IdLimited = {
    instance: string;
    id: string;
    key: string;
};
export type IdUsedLanguage = {
    name: string;
    key: string;
    id: string;
    version: string;
};
export type IdJson = {
    language: string;
    version: string;
    key: string;
    languages: IdUsedLanguage[];
    classifiers: IdClassifier[];
    limited: IdLimited[];
};
export declare class IdTemplate {
    generate_idJson(metamodel: FreModelUnit[]): string;
}
//# sourceMappingURL=IdTemplate.d.ts.map
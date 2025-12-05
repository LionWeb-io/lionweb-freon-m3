import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { LanguageEntity, Feature } from "./internal.js";
export declare abstract class Classifier extends LanguageEntity implements FreNode {
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    features: Feature[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    abstract copy(): Classifier;
    match(toBeMatched: Partial<Classifier>): boolean;
}
//# sourceMappingURL=Classifier.d.ts.map
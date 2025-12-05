import { type FreNode, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { Classifier, Interface } from "./internal.js";
export declare class Annotation extends Classifier implements FreNode {
    static create(data: Partial<Annotation>): Annotation;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    annotates: FreNodeReference<Classifier> | undefined;
    extends: FreNodeReference<Annotation> | undefined;
    implements: FreNodeReference<Interface>[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Annotation;
    match(toBeMatched: Partial<Annotation>): boolean;
    get $annotates(): Classifier | undefined;
    get $extends(): Annotation | undefined;
    get $implements(): readonly Interface[];
}
//# sourceMappingURL=Annotation.d.ts.map
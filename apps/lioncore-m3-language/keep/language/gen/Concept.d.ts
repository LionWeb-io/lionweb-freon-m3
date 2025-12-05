import { type FreNode, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { Classifier, Interface } from "./internal.js";
export declare class Concept extends Classifier implements FreNode {
    static create(data: Partial<Concept>): Concept;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    abstract: boolean;
    partition: boolean;
    extends: FreNodeReference<Concept> | undefined;
    implements: FreNodeReference<Interface>[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Concept;
    match(toBeMatched: Partial<Concept>): boolean;
    get $extends(): Concept | undefined;
    get $implements(): readonly Interface[];
}
//# sourceMappingURL=Concept.d.ts.map
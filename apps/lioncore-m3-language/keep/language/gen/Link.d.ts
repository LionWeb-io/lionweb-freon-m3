import { type FreNode, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { Feature, Classifier } from "./internal.js";
export declare abstract class Link extends Feature implements FreNode {
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    multiple: boolean;
    type: FreNodeReference<Classifier>;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    abstract copy(): Link;
    match(toBeMatched: Partial<Link>): boolean;
    get $type(): Classifier | undefined;
}
//# sourceMappingURL=Link.d.ts.map
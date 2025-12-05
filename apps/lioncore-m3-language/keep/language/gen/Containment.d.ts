import { type FreNode, FreParseLocation } from "@freon4dsl/core";
import { Link } from "./internal.js";
export declare class Containment extends Link implements FreNode {
    static create(data: Partial<Containment>): Containment;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Containment;
    match(toBeMatched: Partial<Containment>): boolean;
}
//# sourceMappingURL=Containment.d.ts.map
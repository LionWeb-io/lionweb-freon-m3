import { type FreNode, FreParseLocation, FreNodeReference } from "@freon4dsl/core";
import { Classifier } from "./internal.js";
export declare class Interface extends Classifier implements FreNode {
    static create(data: Partial<Interface>): Interface;
    readonly $typename: string;
    parseLocation: FreParseLocation | undefined;
    extends: FreNodeReference<Interface>[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): Interface;
    match(toBeMatched: Partial<Interface>): boolean;
    get $extends(): readonly Interface[];
}
//# sourceMappingURL=Interface.d.ts.map
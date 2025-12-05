import { MobxModelElementImpl, type FreModel, FreParseLocation, type FreModelUnit } from "@freon4dsl/core";
import { Language } from "./internal.js";
export declare class LionCore_M3 extends MobxModelElementImpl implements FreModel {
    static create(data: Partial<LionCore_M3>): LionCore_M3;
    readonly $typename: string;
    $id: string;
    parseLocation: FreParseLocation | undefined;
    name: string;
    units: Language[];
    constructor(id?: string);
    freLanguageConcept(): string;
    freId(): string;
    freIsModel(): boolean;
    freIsUnit(): boolean;
    freIsExpression(): boolean;
    freIsBinaryExpression(): boolean;
    copy(): LionCore_M3;
    match(toBeMatched: Partial<LionCore_M3>): boolean;
    findUnit(name: string, metatype?: string): FreModelUnit | undefined;
    addUnit(newUnit: FreModelUnit): boolean;
    removeUnit(oldUnit: FreModelUnit): boolean;
    newUnit(typename: string): FreModelUnit | undefined;
    getUnits(): FreModelUnit[];
    getUnitsForType(type: string): FreModelUnit[];
}
//# sourceMappingURL=LionCore_M3.d.ts.map
import { type FreNode, type FreType, type FreTyper, FreCompositeTyper } from "@freon4dsl/core";
export declare class LionCore_M3TyperPart implements FreTyper {
    mainTyper: FreCompositeTyper;
    isType(node: FreNode): boolean | undefined;
    inferType(node: FreNode): FreType | undefined;
    equals(type1: FreType, type2: FreType): boolean | undefined;
    conforms(type1: FreType, type2: FreType): boolean | undefined;
    conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | undefined;
    commonSuper(typelist: FreType[]): FreType | undefined;
    getSuperTypes(type: FreType): FreType[] | undefined;
}
//# sourceMappingURL=LionCore_M3TyperPart.d.ts.map
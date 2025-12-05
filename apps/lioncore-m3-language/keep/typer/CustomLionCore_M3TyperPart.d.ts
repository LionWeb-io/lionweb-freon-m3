import { type FreNode, type FreType, type FreTyper } from "@freon4dsl/core";
export declare class CustomLionCore_M3TyperPart implements FreTyper {
    mainTyper: FreTyper;
    isType(node: FreNode): boolean | undefined;
    inferType(node: FreNode): FreType | undefined;
    equals(type1: FreType, type2: FreType): boolean | undefined;
    conforms(type1: FreType, type2: FreType): boolean | undefined;
    conformsList(typelist1: FreType[], typelist2: FreType[]): boolean | undefined;
    commonSuper(typelist: FreType[]): FreType | undefined;
    getSuperTypes(type: FreType): FreType[] | undefined;
}
//# sourceMappingURL=CustomLionCore_M3TyperPart.d.ts.map
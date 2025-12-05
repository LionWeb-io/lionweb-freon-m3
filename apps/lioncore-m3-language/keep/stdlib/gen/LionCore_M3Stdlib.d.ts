import { type FreNamedNode, type FreStdlib } from "@freon4dsl/core";
export declare class LionCore_M3Stdlib implements FreStdlib {
    private static stdlib;
    static getInstance(): FreStdlib;
    elements: FreNamedNode[];
    private constructor();
    find(name: string, metatype?: string): FreNamedNode | undefined;
}
//# sourceMappingURL=LionCore_M3Stdlib.d.ts.map
import { type FreNode, type FreNamedNode, FreNodeReference, FreNamespaceInfo, type FreScoper, FreCompositeScoper } from "@freon4dsl/core";
export declare class CustomLionCore_M3Scoper implements FreScoper {
    mainScoper: FreCompositeScoper;
    getVisibleNodes(_node: FreNode | FreNodeReference<FreNamedNode>, _metaType?: string): FreNamedNode[];
    importedNamespaces(_node: FreNode): FreNamespaceInfo[];
    alternativeNamespaces(_node: FreNode): FreNamespaceInfo[];
}
//# sourceMappingURL=CustomLionCore_M3Scoper.d.ts.map
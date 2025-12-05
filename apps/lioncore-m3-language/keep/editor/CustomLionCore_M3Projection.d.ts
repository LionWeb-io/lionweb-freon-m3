import { type FreNode, Box, type FreProjection, type FreTableDefinition, FreProjectionHandler } from "@freon4dsl/core";
export declare class CustomLionCore_M3Projection implements FreProjection {
    name: string;
    handler: FreProjectionHandler;
    nodeTypeToBoxMethod: Map<string, (node: FreNode) => Box>;
    nodeTypeToTableDefinition: Map<string, () => FreTableDefinition>;
}
//# sourceMappingURL=CustomLionCore_M3Projection.d.ts.map
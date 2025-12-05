import { FreModelUnit } from "@freon4dsl/core";
import { Concept, Feature } from "../../language/gen/index.js";
export declare class AstTemplate {
    enumerations: string[];
    primitiveTypes: string[];
    partitions: Concept[];
    constructor(enumerations: string[], primitiveTypes: string[], partitions: Concept[]);
    generateFreonAst(modelUnit: FreModelUnit): string;
    private exportClassifier;
    exportFeature(feature: Feature): string;
    primitive2freon: Map<string, string>;
    generateModelWithUnits(languagename: string, partitions: Concept[]): string;
}
//# sourceMappingURL=AstTemplate.d.ts.map
import { type FreNode } from "@freon4dsl/core";
import { type LionCore_M3Worker } from "./LionCore_M3Worker.js";
export declare class LionCore_M3Walker {
    myWorkers: LionCore_M3Worker[];
    walk(node: FreNode, includeChildren?: (elem: FreNode) => boolean): void;
    private walkReference;
    private walkPrimitiveType;
    private walkEnumeration;
    private walkContainment;
    private walkInterface;
    private walkConcept;
    private walkAnnotation;
    private walkProperty;
    private walkLink;
    private walkClassifier;
    private walkDataType;
    private walkLanguageEntity;
    private walkFeature;
    private walkEnumerationLiteral;
    private walkNode;
    private walkLanguage;
    private walkLionCore_M3;
}
//# sourceMappingURL=LionCore_M3Walker.d.ts.map
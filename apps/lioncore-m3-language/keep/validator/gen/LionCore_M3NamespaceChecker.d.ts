import { FreError, type FreWriter } from "@freon4dsl/core";
import { LionCore_M3, Language, Node, Annotation, Concept, Interface, Containment, DataType, Enumeration, EnumerationLiteral, Feature, Classifier, Link, LanguageEntity, PrimitiveType, Property, Reference } from "../../language/gen/index.js";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
import { type LionCore_M3CheckerInterface } from "./LionCore_M3Validator.js";
export declare class LionCore_M3NamespaceChecker extends LionCore_M3DefaultWorker implements LionCore_M3CheckerInterface {
    myWriter: FreWriter;
    errorList: FreError[];
    execBeforeLionCore_M3(node: LionCore_M3): boolean;
    execBeforeLanguage(node: Language): boolean;
    execBeforeNode(node: Node): boolean;
    execBeforeAnnotation(node: Annotation): boolean;
    execBeforeConcept(node: Concept): boolean;
    execBeforeInterface(node: Interface): boolean;
    execBeforeContainment(node: Containment): boolean;
    execBeforeDataType(node: DataType): boolean;
    execBeforeEnumeration(node: Enumeration): boolean;
    execBeforeEnumerationLiteral(node: EnumerationLiteral): boolean;
    execBeforeFeature(node: Feature): boolean;
    execBeforeClassifier(node: Classifier): boolean;
    execBeforeLink(node: Link): boolean;
    execBeforeLanguageEntity(node: LanguageEntity): boolean;
    execBeforePrimitiveType(node: PrimitiveType): boolean;
    execBeforeProperty(node: Property): boolean;
    execBeforeReference(node: Reference): boolean;
    private checkDuplicateNamesInNamespace;
}
//# sourceMappingURL=LionCore_M3NamespaceChecker.d.ts.map
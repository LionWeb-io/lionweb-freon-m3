import { Node, Annotation, Concept, Interface, Containment, DataType, Enumeration, EnumerationLiteral, Feature, Classifier, Link, LanguageEntity, PrimitiveType, Property, Reference, Language, LionCore_M3 } from "../../language/gen/index.js";
import { type LionCore_M3Worker } from "./LionCore_M3Worker.js";
export declare class LionCore_M3DefaultWorker implements LionCore_M3Worker {
    execBeforeLionCore_M3(node: LionCore_M3): boolean;
    execAfterLionCore_M3(node: LionCore_M3): boolean;
    execBeforeLanguage(node: Language): boolean;
    execAfterLanguage(node: Language): boolean;
    execBeforeNode(node: Node): boolean;
    execAfterNode(node: Node): boolean;
    execBeforeAnnotation(node: Annotation): boolean;
    execAfterAnnotation(node: Annotation): boolean;
    execBeforeConcept(node: Concept): boolean;
    execAfterConcept(node: Concept): boolean;
    execBeforeInterface(node: Interface): boolean;
    execAfterInterface(node: Interface): boolean;
    execBeforeContainment(node: Containment): boolean;
    execAfterContainment(node: Containment): boolean;
    execBeforeDataType(node: DataType): boolean;
    execAfterDataType(node: DataType): boolean;
    execBeforeEnumeration(node: Enumeration): boolean;
    execAfterEnumeration(node: Enumeration): boolean;
    execBeforeEnumerationLiteral(node: EnumerationLiteral): boolean;
    execAfterEnumerationLiteral(node: EnumerationLiteral): boolean;
    execBeforeFeature(node: Feature): boolean;
    execAfterFeature(node: Feature): boolean;
    execBeforeClassifier(node: Classifier): boolean;
    execAfterClassifier(node: Classifier): boolean;
    execBeforeLink(node: Link): boolean;
    execAfterLink(node: Link): boolean;
    execBeforeLanguageEntity(node: LanguageEntity): boolean;
    execAfterLanguageEntity(node: LanguageEntity): boolean;
    execBeforePrimitiveType(node: PrimitiveType): boolean;
    execAfterPrimitiveType(node: PrimitiveType): boolean;
    execBeforeProperty(node: Property): boolean;
    execAfterProperty(node: Property): boolean;
    execBeforeReference(node: Reference): boolean;
    execAfterReference(node: Reference): boolean;
}
//# sourceMappingURL=LionCore_M3DefaultWorker.d.ts.map
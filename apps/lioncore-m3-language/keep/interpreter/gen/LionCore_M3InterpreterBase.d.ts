import { InterpreterContext, RtObject } from "@freon4dsl/core";
import { Node, Annotation, Concept, Interface, Containment, DataType, Enumeration, EnumerationLiteral, Feature, Classifier, Link, LanguageEntity, PrimitiveType, Property, Reference, Language } from "../../language/gen/index.js";
export declare class LionCore_M3InterpreterBase {
    constructor();
    evalNode(node: Node, ctx: InterpreterContext): RtObject;
    evalAnnotation(node: Annotation, ctx: InterpreterContext): RtObject;
    evalConcept(node: Concept, ctx: InterpreterContext): RtObject;
    evalInterface(node: Interface, ctx: InterpreterContext): RtObject;
    evalContainment(node: Containment, ctx: InterpreterContext): RtObject;
    evalDataType(node: DataType, ctx: InterpreterContext): RtObject;
    evalEnumeration(node: Enumeration, ctx: InterpreterContext): RtObject;
    evalEnumerationLiteral(node: EnumerationLiteral, ctx: InterpreterContext): RtObject;
    evalFeature(node: Feature, ctx: InterpreterContext): RtObject;
    evalClassifier(node: Classifier, ctx: InterpreterContext): RtObject;
    evalLink(node: Link, ctx: InterpreterContext): RtObject;
    evalLanguageEntity(node: LanguageEntity, ctx: InterpreterContext): RtObject;
    evalPrimitiveType(node: PrimitiveType, ctx: InterpreterContext): RtObject;
    evalProperty(node: Property, ctx: InterpreterContext): RtObject;
    evalReference(node: Reference, ctx: InterpreterContext): RtObject;
    evalLanguage(node: Language, ctx: InterpreterContext): RtObject;
}
//# sourceMappingURL=LionCore_M3InterpreterBase.d.ts.map
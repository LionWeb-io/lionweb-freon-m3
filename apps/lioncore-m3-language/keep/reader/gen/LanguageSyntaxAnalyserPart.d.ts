import { type KtList, type Sentence, type SpptDataNodeInfo } from "net.akehurst.language-agl-processor";
import { Language, Enumeration, EnumerationLiteral, PrimitiveType, Annotation, Containment, Reference, Property, Concept, Interface, LanguageEntity, Classifier, Feature, DataType, Link } from "../../language/gen/index.js";
import { LionCore_M3SyntaxAnalyser } from "./LionCore_M3SyntaxAnalyser.js";
export declare class LanguageSyntaxAnalyserPart {
    mainAnalyser: LionCore_M3SyntaxAnalyser;
    constructor(mainAnalyser: LionCore_M3SyntaxAnalyser);
    transformLanguage(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Language;
    transformEnumeration(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Enumeration;
    transformEnumerationLiteral(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): EnumerationLiteral;
    transformPrimitiveType(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): PrimitiveType;
    transformAnnotation(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Annotation;
    transformContainment(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Containment;
    transformReference(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Reference;
    transformProperty(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Property;
    transformConcept(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Concept;
    transformInterface(nodeInfo: SpptDataNodeInfo, children: KtList<any>, sentence: Sentence): Interface;
    transformLanguageEntity(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): LanguageEntity;
    transformDataType(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): DataType;
    transformClassifier(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): Classifier;
    transformFeature(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): Feature;
    transformLink(nodeInfo: SpptDataNodeInfo, children: KtList<object>, sentence: Sentence): Link;
}
//# sourceMappingURL=LanguageSyntaxAnalyserPart.d.ts.map
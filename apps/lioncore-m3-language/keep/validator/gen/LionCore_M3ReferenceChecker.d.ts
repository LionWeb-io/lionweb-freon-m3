import { FreError, type FreWriter } from "@freon4dsl/core";
import { Language, Annotation, Concept, Interface, Containment, Link, Property, Reference } from "../../language/gen/index.js";
import { LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
import { type LionCore_M3CheckerInterface } from "./LionCore_M3Validator.js";
export declare class LionCore_M3ReferenceChecker extends LionCore_M3DefaultWorker implements LionCore_M3CheckerInterface {
    myWriter: FreWriter;
    errorList: FreError[];
    private refSeparator;
    execBeforeLanguage(node: Language): boolean;
    execBeforeAnnotation(node: Annotation): boolean;
    execBeforeConcept(node: Concept): boolean;
    execBeforeInterface(node: Interface): boolean;
    execBeforeContainment(node: Containment): boolean;
    execBeforeLink(node: Link): boolean;
    execBeforeProperty(node: Property): boolean;
    execBeforeReference(node: Reference): boolean;
    private makeErrorMessage;
}
//# sourceMappingURL=LionCore_M3ReferenceChecker.d.ts.map
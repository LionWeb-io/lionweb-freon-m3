import { FreModelUnit } from "@freon4dsl/core";
import {
    Concept,
    Interface,
    Containment,
    Enumeration,
    Feature,
    Language,
    LanguageEntity,
    PrimitiveType,
    Property,
    Reference
} from "../../language/gen/index.js";

export class AstTemplate {

    enumerations: string[] = []
    primitiveTypes: string[]= []
    partitions: Concept[] = []
    
    constructor(enumerations: string[], primitiveTypes: string[], partitions: Concept[] ) {
        this.enumerations = enumerations
        this.primitiveTypes = primitiveTypes
        this.partitions = partitions
    }
    generateFreonAst(modelUnit: FreModelUnit): string {
        let result = "";
        result += (`language ${modelUnit.name}\n\n`);
        (modelUnit as Language).entities.forEach(entity => {
            result += this.exportClassifier(entity);
            result += "\n";
        });
        return result;
    }

    private exportClassifier(entity: LanguageEntity) {
        let result = "";
        switch (entity.freLanguageConcept()) {
            case "Concept":
                const concept = entity as Concept;
                const abstract = concept.abstract ? "abstract " : "";
                const base = !!(concept.extends) ? ` base ${concept.extends.name}` : "";
                const conceptKeyword = ((entity as Concept).partition ? "modelunit" : "concept");
                const implments = concept.implements.length !== 0 ? ` implements ${concept.implements.map(i => i.name).join(", ")} ` : "";
                result += (`${abstract} ${conceptKeyword} ${concept.name}${base}${implments} {\n`);
                (entity as Concept).features.forEach(feature => {
                    result += this.exportFeature(feature) + "\n";
                });
                break;
            case "Interface":
                const intface = entity as Interface;
                const xtends = intface.extends.length !== 0 ? ` base ${intface.extends.map(i => i.name).join(", ")} ` : "";
                result += (`interface ${intface.name} ${xtends}{\n`);
                intface.features.forEach(feature => {
                    result += this.exportFeature(feature) + "\n";
                });
                break;
            case "Enumeration":
                const enumeration = entity as Enumeration;
                result += (`limited ${enumeration.name} {\n`);
                enumeration.literals.forEach(literal => {
                    result += (`    ${literal.name};\n`);
                });
                break;
            case "PrimitiveType":
                const primType = entity as PrimitiveType;
                let type = this.primitive2freon.get(primType.name);
                if (type === undefined) {
                    // Not a Freon primitive type, so create a concept for it.
                    result += (`// PrimitiveType\nconcept ${primType.name} {\n    value: string;\n}\n`);
                }
                break;
            default:
                console.log(`Unknown concept type =>  ${entity.name}: ${entity.freLanguageConcept()}`)
        }
        if (entity.freLanguageConcept() !== "PrimitiveType") {
            result += ("}\n");
        }
        return result;
    }

    exportFeature(feature: Feature): string {
        let optional = (feature.optional ? "?" : "");
        switch (feature.freLanguageConcept()) {
            case "Property":
                const name = feature.name;
                const property = feature as Property
                if (this.primitiveTypes.includes(property.type.name)) {
                    let type = this.primitive2freon.get(property.type.name);
                    if (type !== undefined) {
                        // it is a Freon primitive
                        type = (name === "name") && type === "string" ? "identifier" : type;
                        return (`    ${name}${optional}: ${type};`);
                    } else {
                        // It is a primitive represented as Concept in Freon.
                        return (`   ${property.name}${optional}: ${property.type.name};`);
                    }
                } else if (this.enumerations.includes(property.type.name)) {
                    // it is a limited
                    return `    ${feature.name}${optional}: ${property.type.name};`
                } else {
                    console.error(`ERROR: unknown property type ${property.type.name}`)
                    return ""
                }
            
            case "Reference":
                if ((feature as Reference).multiple) {
                    optional = "";
                }
                return (`    reference ${feature.name}${optional}: ${(feature as Reference).type.name}${(feature as Reference).multiple ? "[]" : ""};`);
            case "Containment":
                if ((feature as Containment).multiple) {
                    optional = "";
                }
                return (`    ${feature.name}${optional}: ${(feature as Containment).type.name}${(feature as Containment).multiple ? "[]" : ""};`);
            default:
                return (`    ${feature.name}: ${feature.freLanguageConcept()}`);
        }
    }
    
    primitive2freon: Map<string, string> = new Map<string, string>([
        ["Number","number"],
        ["Integer","number"],
        ["String","string"],
        ["Boolean","boolean"],
        ["number","number"],
        ["integer","number"],
        ["string","string"],
        ["boolean","boolean"],
        ["JSON","string"]])
    
    
    generateModelWithUnits(languagename: string, partitions: Concept[]): string {
        let result = "";
        result += `language ${languagename}\n`;
        result += '\n';
        result += `model ${languagename} {\n`;
        result += `    name: identifier;\n`
        partitions.forEach(unit => result += `    ${unit.name.toLowerCase()}: ${unit.name}[];\n`);
        result += `}\n\n`
        return result;
    }

}

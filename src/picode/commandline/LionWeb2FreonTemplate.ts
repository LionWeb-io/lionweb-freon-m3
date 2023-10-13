import { FreModelUnit } from "@freon4dsl/core";
import fs from "fs";
import {
    Concept,
    ConceptInterface,
    Containment,
    Enumeration,
    Feature,
    Language,
    LanguageEntity,
    PrimitiveType,
    Property,
    Reference
} from "../language/gen/index";

export class LionWeb2FreonTemplate {

    generateFreonAst(metamodel: FreModelUnit): string {
        let result = "";
        result += (`language ${metamodel.name}\n\n`);
        (metamodel as Language).entities.forEach(entity => {
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
            case "ConceptInterface":
                const intface = entity as ConceptInterface;
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
                result += (`concept ${primType.name} { // primitive\n`);
                break;
            default:
                console.log(`Unknown concept type =>  ${entity.name}: ${entity.freLanguageConcept()}`)
        }
        ;
        result += ("}\n");
        return result;
    }

    exportFeature(feature: Feature): string {
        let optional = (feature.optional ? "?" : "");
        switch (feature.freLanguageConcept()) {
            case "Property":
                const name = feature.name;
                let type = (feature as Property).type.name.toLowerCase();
                type = (name === "name") && type === "string" ? "identifier" : type;
                return (`    ${name}${optional}: ${type};`);
                break;
            case "Reference":
                if ((feature as Reference).multiple) {
                    optional = "";
                }
                return (`    reference ${feature.name}${optional}: ${(feature as Reference).type.name}${(feature as Reference).multiple ? "[]" : ""};`);
                break;
            case "Containment":
                if ((feature as Containment).multiple) {
                    optional = "";
                }
                return (`    ${feature.name}${optional}: ${(feature as Containment).type.name}${(feature as Containment).multiple ? "[]" : ""};`);
                break;
            default:
                return (`    ${feature.name}: ${feature.freLanguageConcept()}`);
        }
    }
    
    generateModelUnits(units: LanguageEntity[]): string {
        let result = "";
        result += `language ${"aaa"}\n`;
        result += '\n';
        result += `model ${"aaa"} {\n`;
        result += `    name: identifier;\n`
        units.forEach(unit => result += `    ${unit.name.toLowerCase()}: ${unit.freLanguageConcept()}[];\n`);
        result += `}\n\n`
        return result;
    }

}

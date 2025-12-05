export class AstTemplate {
    constructor(enumerations, primitiveTypes, partitions) {
        this.enumerations = [];
        this.primitiveTypes = [];
        this.partitions = [];
        this.primitive2freon = new Map([
            ["Number", "number"],
            ["Integer", "number"],
            ["String", "string"],
            ["Boolean", "boolean"],
            ["number", "number"],
            ["integer", "number"],
            ["string", "string"],
            ["boolean", "boolean"],
            ["JSON", "string"]
        ]);
        this.enumerations = enumerations;
        this.primitiveTypes = primitiveTypes;
        this.partitions = partitions;
    }
    generateFreonAst(modelUnit) {
        let result = "";
        result += (`language ${modelUnit?.name}\n\n`);
        modelUnit.entities.forEach(entity => {
            result += this.exportClassifier(entity);
            result += "\n";
        });
        return result;
    }
    exportClassifier(entity) {
        let result = "";
        switch (entity.freLanguageConcept()) {
            case "Concept":
                const concept = entity;
                const abstract = concept.abstract ? "abstract " : "";
                const base = !!(concept.extends) ? ` base ${concept.extends?.name}` : "";
                const conceptKeyword = (entity.partition ? "modelunit" : "concept");
                const implments = concept.implements.length !== 0 ? ` implements ${concept.implements.map(i => i?.name).join(", ")} ` : "";
                result += (`${abstract} ${conceptKeyword} ${concept?.name}${base}${implments} {\n`);
                entity.features.forEach(feature => {
                    result += this.exportFeature(feature) + "\n";
                });
                break;
            case "Interface":
                const intface = entity;
                const xtends = intface.extends.length !== 0 ? ` base ${intface.extends.map(i => i?.name).join(", ")} ` : "";
                result += (`interface ${intface?.name} ${xtends}{\n`);
                intface.features.forEach(feature => {
                    result += this.exportFeature(feature) + "\n";
                });
                break;
            case "Enumeration":
                const enumeration = entity;
                result += (`limited ${enumeration?.name} {\n`);
                enumeration.literals.forEach(literal => {
                    result += (`    ${literal?.name};\n`);
                });
                break;
            case "PrimitiveType":
                const primType = entity;
                let type = this.primitive2freon.get(primType?.name);
                if (type === undefined) {
                    result += (`// PrimitiveType\nconcept ${primType?.name} {\n    value: string;\n}\n`);
                }
                break;
            default:
                console.log(`Unknown concept type =>  ${entity?.name}: ${entity.freLanguageConcept()}`);
        }
        if (entity.freLanguageConcept() !== "PrimitiveType") {
            result += ("}\n");
        }
        return result;
    }
    exportFeature(feature) {
        let optional = (feature.optional ? "?" : "");
        switch (feature.freLanguageConcept()) {
            case "Property":
                const name = feature?.name;
                const property = feature;
                if (this.primitiveTypes.includes(property.type?.name)) {
                    let type = this.primitive2freon.get(property.type?.name);
                    if (type !== undefined) {
                        type = (name === "name") && type === "string" ? "identifier" : type;
                        return (`    ${name}${optional}: ${type};`);
                    }
                    else {
                        return (`   ${property?.name}${optional}: ${property.type?.name};`);
                    }
                }
                else if (this.enumerations.includes(property.type?.name)) {
                    return `    ${feature.name}${optional}: ${property.type.name};`;
                }
                else {
                    console.error(`ERROR: unknown property type ${property.type.name}`);
                    return "";
                }
            case "Reference":
                if (feature.multiple) {
                    optional = "";
                }
                return (`    reference ${feature.name}${optional}: ${feature.type.name}${feature.multiple ? "[]" : ""};`);
            case "Containment":
                if (feature.multiple) {
                    optional = "";
                }
                return (`    ${feature.name}${optional}: ${feature.type.name}${feature.multiple ? "[]" : ""};`);
            default:
                return (`    ${feature.name}: ${feature.freLanguageConcept()}`);
        }
    }
    generateModelWithUnits(languagename, partitions) {
        let result = "";
        result += `language ${languagename}\n`;
        result += '\n';
        result += `model ${languagename} {\n`;
        result += `    name: identifier;\n`;
        partitions.forEach(unit => result += `    ${unit.name.toLowerCase()}: ${unit.name}[];\n`);
        result += `}\n\n`;
        return result;
    }
}
//# sourceMappingURL=AstTemplate.js.map
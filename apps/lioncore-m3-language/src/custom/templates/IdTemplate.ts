import { FreModelUnit } from "@freon4dsl/core";
import { LionWebJsonMetaPointer } from "@lionweb/json";
import { Concept, Enumeration, Interface, Language, PrimitiveType } from "../../freon/language/index.js";

/**
 * THis file comtains the structure and template for the Id.json file,
 * which is used in Freon to ensure that the LionWeb i'ds are maintained correctly.
 */
export type IdProperty = {
    name: string
    id: string
    key: string
}

export type IdClassifier = {
    name: string
    id: string
    key: string
    properties: IdProperty[]
}

export type IdLimited = {
    instance: string
    id: string
    key: string
}

export type IdUsedLanguage = {
    name: string
    key: string
    id: string // TODO Needed?
    version: string
}
export type IdJson = {
    language: string
    version: string
    key: string
    languages: IdUsedLanguage[]
    classifiers: IdClassifier[]
    limited: IdLimited[]
}

type NamedMetaPointer = {
    name: string,
    mp: LionWebJsonMetaPointer
}

export class IdTemplate {
    tsKeyMap: Map<string, NamedMetaPointer[]>
    language: string
    
    generate_idJson(languageName: string, metamodel: FreModelUnit[]): string {
        this.language = languageName
        const keysMap: Map<string, NamedMetaPointer[]>  = new Map<string, NamedMetaPointer[]>()
        keysMap.set("Classifier", [])
        keysMap.set("Property", [])
        keysMap.set("Containment", [])
        keysMap.set("Reference", [])
        let tsKeyConstants = ""
        let idObject: IdJson = { language: "", version: "", key: "", languages: [], classifiers: [], limited: []};
        metamodel.forEach(languageUnit => {
            if (!(languageUnit instanceof Language)) {
                console.error("Expecting only model units of type Language, but found one of type " + languageUnit.freLanguageConcept())
                process.exit(-1)
            }
            idObject.languages.push({
                name: (languageUnit as Language).name,
                key: (languageUnit as Language).key,
                id: (languageUnit as Language).freId(),
                version: "TODO"
            });
            languageUnit.entities.forEach(ent => {
                switch (ent.freLanguageConcept()) {
                    case "Concept": {
                        const key = (ent as Concept).key === "" ? `-key-${(ent as Concept).name}` : (ent as Concept).key
                        const concept: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        keysMap.get("Classifier").push( {
                            name: ent.name,
                            mp: { language: languageUnit.key, key: key, version: "1"}
                        })
                        // tsKeyConstants += `export const ${ent.name}Classifier = {language: "${languageUnit.key}", key: "${key}", version: "1"}`
                        for (const prop of (ent as Concept).features) {
                            const key = prop.key === "" ? `-key-${(ent as Concept).name}-${prop.name}` : prop.key
                            concept.properties.push({ name: prop.name, key: key, id: prop.freId() })
                            // const fType = prop.freLanguageConcept()
                            keysMap.get(prop.freLanguageConcept()).push( {
                                name: `${ent.name}${toFirstUpper(prop.name)}`,
                                mp: { language: `${languageUnit.key}`, key: `${key}`, version: "1"}
                            })
                            // tsKeyConstants += `export const ${ent.name}${toFirstUpper(prop.name)}${fType} = {language: "${languageUnit.key}", key: "${key}", version: "1"}`
                        }
                        idObject.classifiers.push(concept);
                        break;
                    }
                    case "Interface": {
                        const key = (ent as Interface).key === "" ? `-key-${(ent as Interface).name}` : (ent as Interface).key
                        const intface: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        keysMap.get("Classifier").push( {
                            name: ent.name,
                            mp: { language: languageUnit.key, key: key, version: "1"}
                        })
                        // tsKeyConstants += `export const ${ent.name}Classifier = {language: "${languageUnit.key}", key: "${key}", version: "1"}`
                        for (const prop of (ent as Interface).features) {
                            const key = prop.key === "" ? `-key-${(ent as Interface).name}-${prop.name}` : prop.key
                            intface.properties.push({ name: prop.name, key: key, id: prop.freId() })
                            // const fType = prop.freLanguageConcept()
                            keysMap.get(prop.freLanguageConcept()).push( {
                                name: `${ent.name}${toFirstUpper(prop.name)}`,
                                mp: { language: `${languageUnit.key}`, key: `${key}`, version: "1"}
                            })
                            // tsKeyConstants += `export const ${ent.name}${toFirstUpper(prop.name)}${fType} = {language: "${languageUnit.key}", key: "${key}", version: "1"}`
                        }
                        idObject.classifiers.push(intface);
                        break;
                    }
                    case "Enumeration": {
                        const key = (ent as Enumeration).key === "" ? `-key-${(ent as Enumeration).name}` : (ent as Enumeration).key
                        const limited: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        break
                    }
                    case "PrimitiveType": {
                        const key = (ent as PrimitiveType).key === "" ? `-key-${(ent as PrimitiveType).name}` : (ent as PrimitiveType).key
                        const primitive: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        break
                    }
                    default:
                        console.log("No id for entity " + ent.name + " of unknown type " + ent.freLanguageConcept())
                }
            });
        });
        // this.tsKeys = tsKeyConstants
        this.tsKeyMap = keysMap
        return JSON.stringify(idObject, null, 4);
    }

    /**
     * Generate a TypoeScript file with constants for all keys in the language.
     * Easy as helpers for all the LionWeb metapointers.
     */
    generateKeys(): string {
        if (this.tsKeyMap === undefined) {
            console.error("IdTemplate: Cannot run generateKeys(), must first run generateIdJson().")
        }
        let result = `/**
  * Defines constants for all metapointers in the "${this.language}" language.
  * Generated by Freon LionWeb M3 generator
  */
`
        result += this.tsKeyMap.get("Classifier").map(cls => `const ${cls.name} = ${JSON.stringify(cls.mp)}`).join("\n")
        result += `\n\nexport const CLASSIFIER = {
            ${this.tsKeyMap.get("Classifier").map(cls => cls.name).join(",")} 
        }\n`
        result += this.tsKeyMap.get("Property").map(cls => `const ${cls.name} = ${JSON.stringify(cls.mp)}`).join("\n")
        result += `\n\nexport const PROPERTY = {
            ${this.tsKeyMap.get("Property").map(cls => cls.name).join(",")} 
        }\n`
        result += this.tsKeyMap.get("Reference").map(cls => `const ${cls.name} = ${JSON.stringify(cls.mp)}`).join("\n")
        result += `\n\nexport const REFERENCE = {
            ${this.tsKeyMap.get("Reference").map(cls => cls.name).join(",")} 
        }\n`
        result += this.tsKeyMap.get("Containment").map(cls => `const ${cls.name} = ${JSON.stringify(cls.mp)}`).join("\n")
        result += `\n\nexport const CONTAINMENT = {
            ${this.tsKeyMap.get("Containment").map(cls => cls.name).join(",")} 
        }\n`
        return result
    }
}

function toFirstUpper(text: string): string {
    return text[0].toUpperCase().concat(text.substring(1));
}

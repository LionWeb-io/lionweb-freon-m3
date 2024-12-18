import { FreModelUnit } from "@freon4dsl/core";
import { Concept, Interface, Language } from "../../language/gen/index.js";

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

export class IdTemplate {
    generate_idJson(metamodel: FreModelUnit[]): string {
        let idObject: IdJson = { language: "", version: "", key: "", languages: [], classifiers: [], limited: []};
        metamodel.forEach(mu => {
            if (!(mu instanceof Language)) {
                console.error("Expecting only model units of type Language, but found one of type " + mu.freLanguageConcept())
                process.exit(-1)
            }
            idObject.languages.push({
                name: (mu as Language).name,
                key: (mu as Language).key,
                id: (mu as Language).freId(),
                version: "TODO"
            });
            mu.entities.forEach(ent => {
                switch (ent.freLanguageConcept()) {
                    case "Concept":
                        console.log("Add id for Concept " + ent.name + " key " + (ent as Concept).key);
                        const concept: IdClassifier = { name: ent.name, id: ent.freId(), key: (ent as Concept).key, properties: [] };
                        for (const prop of (ent as Concept).features) {
                            concept.properties.push({ name: prop.name, key: prop.key, id: prop.freId() })
                        }
                        idObject.classifiers.push(concept);
                        break;
                    case "Interface":
                        console.log("Add id for Interface " + ent.name + " key " + (ent as Interface).key);
                        const intface: IdClassifier = { name: ent.name, id: ent.freId(), key: (ent as Interface).key, properties: [] };
                        for (const prop of (ent as Interface).features) {
                            intface.properties.push({ name: prop.name, key: prop.key, id: prop.freId() })
                        }
                        idObject.classifiers.push(intface);
                        break;
                    case "Enumeration":
                        console.log("TODO Add id for Enumeration " + ent.name + " key " + (ent as Interface).key);
                        
                        break
                    default:
                        console.log("NOTHIJNG ADDED id for entity " + ent.name + " of type " + ent.freLanguageConcept())
                }
            });
        });
        return JSON.stringify(idObject, null, 4);
    }
}

import { FreModelUnit } from "@freon4dsl/core";
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
                    case "Concept": {
                        const key = (ent as Concept).key === "" ? `-key-${(ent as Concept).name}` : (ent as Concept).key
                        const concept: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        for (const prop of (ent as Concept).features) {
                            const key = prop.key === "" ? `-key-${(ent as Concept).name}-${prop.name}` : prop.key
                            concept.properties.push({ name: prop.name, key: key, id: prop.freId() })
                        }
                        idObject.classifiers.push(concept);
                        break;
                    }
                    case "Interface": {
                        const key = (ent as Interface).key === "" ? `-key-${(ent as Interface).name}` : (ent as Interface).key
                        const intface: IdClassifier = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        for (const prop of (ent as Interface).features) {
                            const key = prop.key === "" ? `-key-${(ent as Interface).name}-${prop.name}` : prop.key
                            intface.properties.push({ name: prop.name, key: key, id: prop.freId() })
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
        return JSON.stringify(idObject, null, 4);
    }
}

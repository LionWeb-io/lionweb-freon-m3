import { Language } from "../../language/gen/index.js";
export class IdTemplate {
    generate_idJson(metamodel) {
        let idObject = { language: "", version: "", key: "", languages: [], classifiers: [], limited: [] };
        metamodel.forEach(mu => {
            if (!(mu instanceof Language)) {
                console.error("Expecting only model units of type Language, but found one of type " + mu.freLanguageConcept());
                process.exit(-1);
            }
            idObject.languages.push({
                name: mu.name,
                key: mu.key,
                id: mu.freId(),
                version: "TODO"
            });
            mu.entities.forEach(ent => {
                switch (ent.freLanguageConcept()) {
                    case "Concept": {
                        const key = ent.key === "" ? `-key-${ent.name}` : ent.key;
                        const concept = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        for (const prop of ent.features) {
                            const key = prop.key === "" ? `-key-${ent.name}-${prop.name}` : ent.key;
                            concept.properties.push({ name: prop.name, key: key, id: prop.freId() });
                        }
                        idObject.classifiers.push(concept);
                        break;
                    }
                    case "Interface": {
                        const key = ent.key === "" ? `-key-${ent.name}` : ent.key;
                        const intface = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        for (const prop of ent.features) {
                            const key = prop.key === "" ? `-key-${ent.name}-${prop.name}` : ent.key;
                            intface.properties.push({ name: prop.name, key: key, id: prop.freId() });
                        }
                        idObject.classifiers.push(intface);
                        break;
                    }
                    case "Enumeration": {
                        const key = ent.key === "" ? `-key-${ent.name}` : ent.key;
                        const limited = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        break;
                    }
                    case "PrimitiveType": {
                        const key = ent.key === "" ? `-key-${ent.name}` : ent.key;
                        const primitive = { name: ent.name, id: ent.freId(), key: key, properties: [] };
                        break;
                    }
                    default:
                        console.log("No id for entity " + ent.name + " of unknown type " + ent.freLanguageConcept());
                }
            });
        });
        return JSON.stringify(idObject, null, 4);
    }
}
//# sourceMappingURL=IdTemplate.js.map
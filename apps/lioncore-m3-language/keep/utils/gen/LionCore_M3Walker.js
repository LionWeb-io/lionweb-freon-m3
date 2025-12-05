import { FreLogger, notNullOrUndefined } from "@freon4dsl/core";
import { Reference, PrimitiveType, Enumeration, Containment, Interface, Concept, Annotation, Property, Link, Classifier, DataType, LanguageEntity, Feature, EnumerationLiteral, Node, Language, LionCore_M3, } from "../../language/gen/index.js";
const LOGGER = new FreLogger("LionCore_M3Walker");
export class LionCore_M3Walker {
    constructor() {
        this.myWorkers = [];
    }
    walk(node, includeChildren) {
        if (this.myWorkers.length > 0) {
            if (node instanceof Reference) {
                return this.walkReference(node, includeChildren);
            }
            if (node instanceof PrimitiveType) {
                return this.walkPrimitiveType(node, includeChildren);
            }
            if (node instanceof Enumeration) {
                return this.walkEnumeration(node, includeChildren);
            }
            if (node instanceof Containment) {
                return this.walkContainment(node, includeChildren);
            }
            if (node instanceof Interface) {
                return this.walkInterface(node, includeChildren);
            }
            if (node instanceof Concept) {
                return this.walkConcept(node, includeChildren);
            }
            if (node instanceof Annotation) {
                return this.walkAnnotation(node, includeChildren);
            }
            if (node instanceof Property) {
                return this.walkProperty(node, includeChildren);
            }
            if (node instanceof Link) {
                return this.walkLink(node, includeChildren);
            }
            if (node instanceof Classifier) {
                return this.walkClassifier(node, includeChildren);
            }
            if (node instanceof DataType) {
                return this.walkDataType(node, includeChildren);
            }
            if (node instanceof LanguageEntity) {
                return this.walkLanguageEntity(node, includeChildren);
            }
            if (node instanceof Feature) {
                return this.walkFeature(node, includeChildren);
            }
            if (node instanceof EnumerationLiteral) {
                return this.walkEnumerationLiteral(node, includeChildren);
            }
            if (node instanceof Node) {
                return this.walkNode(node, includeChildren);
            }
            if (node instanceof Language) {
                return this.walkLanguage(node, includeChildren);
            }
            if (node instanceof LionCore_M3) {
                return this.walkLionCore_M3(node, includeChildren);
            }
        }
        else {
            LOGGER.error("No worker found.");
        }
    }
    walkReference(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeReference(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterReference(node);
            }
        }
    }
    walkPrimitiveType(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforePrimitiveType(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterPrimitiveType(node);
            }
        }
    }
    walkEnumeration(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeEnumeration(node);
            }
        }
        node.literals.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterEnumeration(node);
            }
        }
    }
    walkContainment(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeContainment(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterContainment(node);
            }
        }
    }
    walkInterface(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeInterface(node);
            }
        }
        node.features.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterInterface(node);
            }
        }
    }
    walkConcept(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeConcept(node);
            }
        }
        node.features.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterConcept(node);
            }
        }
    }
    walkAnnotation(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeAnnotation(node);
            }
        }
        node.features.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterAnnotation(node);
            }
        }
    }
    walkProperty(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeProperty(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterProperty(node);
            }
        }
    }
    walkLink(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeLink(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterLink(node);
            }
        }
    }
    walkClassifier(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeClassifier(node);
            }
        }
        node.features.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterClassifier(node);
            }
        }
    }
    walkDataType(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeDataType(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterDataType(node);
            }
        }
    }
    walkLanguageEntity(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeLanguageEntity(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterLanguageEntity(node);
            }
        }
    }
    walkFeature(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeFeature(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterFeature(node);
            }
        }
    }
    walkEnumerationLiteral(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeEnumerationLiteral(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterEnumerationLiteral(node);
            }
        }
    }
    walkNode(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeNode(node);
            }
        }
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterNode(node);
            }
        }
    }
    walkLanguage(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeLanguage(node);
            }
        }
        node.entities.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterLanguage(node);
            }
        }
    }
    walkLionCore_M3(node, includeChildren) {
        let stopWalkingThisNode = false;
        for (const worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execBeforeLionCore_M3(node);
            }
        }
        node.units.forEach((p) => {
            if (notNullOrUndefined(includeChildren) && includeChildren(p)) {
                this.walk(p, includeChildren);
            }
        });
        for (let worker of this.myWorkers) {
            if (!stopWalkingThisNode) {
                stopWalkingThisNode = worker.execAfterLionCore_M3(node);
            }
        }
    }
}
//# sourceMappingURL=LionCore_M3Walker.js.map
import { FreLanguage } from "@freon4dsl/core";
import { AnnotationBoxProvider, ConceptBoxProvider, InterfaceBoxProvider, ContainmentBoxProvider, EnumerationBoxProvider, EnumerationLiteralBoxProvider, PrimitiveTypeBoxProvider, PropertyBoxProvider, ReferenceBoxProvider, LanguageBoxProvider, } from "../../editor/gen/index.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
const map = new Map([
    [
        "Annotation",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["annotates", ""],
                    ["extends", ""],
                    ["implements", ""],
                    ["features", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["name", ""],
                    ["annotates", ""],
                    ["extends", ""],
                    ["implements", ""],
                    ["features", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["annotates", ""],
                    ["extends", ""],
                    ["implements", ""],
                    ["features", ""],
                ]),
            ],
        ]),
    ],
    [
        "Concept",
        new Map([
            [
                "textual",
                new Map([
                    ["abstract", ""],
                    ["name", ""],
                    ["extends", ""],
                    ["implements", ""],
                    ["key", ""],
                    ["partition", ""],
                    ["features", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["abstract", ""],
                    ["name", ""],
                    ["extends", ""],
                    ["implements", ""],
                    ["key", ""],
                    ["partition", ""],
                    ["features", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["features", ""],
                    ["abstract", ""],
                    ["partition", ""],
                    ["extends", ""],
                    ["implements", ""],
                ]),
            ],
        ]),
    ],
    [
        "Interface",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["extends", ""],
                    ["key", ""],
                    ["features", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["name", ""],
                    ["extends", ""],
                    ["key", ""],
                    ["features", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["extends", ""],
                    ["key", ""],
                    ["features", ""],
                ]),
            ],
        ]),
    ],
    [
        "Containment",
        new Map([
            [
                "textual",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
        ]),
    ],
    [
        "Enumeration",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["literals", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["literals", ""],
                ]),
            ],
        ]),
    ],
    [
        "EnumerationLiteral",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["key", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                ]),
            ],
        ]),
    ],
    [
        "Feature",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["optional", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["optional", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["optional", ""],
                ]),
            ],
        ]),
    ],
    [
        "PrimitiveType",
        new Map([
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                ]),
            ],
        ]),
    ],
    [
        "Property",
        new Map([
            [
                "textual",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                ]),
            ],
        ]),
    ],
    [
        "Reference",
        new Map([
            [
                "textual",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
            [
                "widgets",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["optional", ""],
                    ["name", ""],
                    ["key", ""],
                    ["type", ""],
                    ["multiple", ""],
                ]),
            ],
        ]),
    ],
    [
        "Language",
        new Map([
            [
                "textual",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["version", ""],
                    ["dependsOn", ""],
                    ["entities", ""],
                ]),
            ],
            [
                "default",
                new Map([
                    ["name", ""],
                    ["key", ""],
                    ["version", ""],
                    ["dependsOn", ""],
                    ["entities", ""],
                ]),
            ],
        ]),
    ],
]);
export function initializeProjections(handler) {
    handler.addProjection("textual");
    handler.addProjection("widgets");
    for (const p of freonConfiguration.customProjection) {
        handler.addCustomProjection(p);
    }
    handler.initConceptToPropertyProjection(map);
    handler.initProviderConstructors(new Map([
        [
            "Annotation",
            () => {
                return new AnnotationBoxProvider(handler);
            },
        ],
        [
            "Concept",
            () => {
                return new ConceptBoxProvider(handler);
            },
        ],
        [
            "Interface",
            () => {
                return new InterfaceBoxProvider(handler);
            },
        ],
        [
            "Containment",
            () => {
                return new ContainmentBoxProvider(handler);
            },
        ],
        [
            "Enumeration",
            () => {
                return new EnumerationBoxProvider(handler);
            },
        ],
        [
            "EnumerationLiteral",
            () => {
                return new EnumerationLiteralBoxProvider(handler);
            },
        ],
        [
            "PrimitiveType",
            () => {
                return new PrimitiveTypeBoxProvider(handler);
            },
        ],
        [
            "Property",
            () => {
                return new PropertyBoxProvider(handler);
            },
        ],
        [
            "Reference",
            () => {
                return new ReferenceBoxProvider(handler);
            },
        ],
        [
            "Language",
            () => {
                return new LanguageBoxProvider(handler);
            },
        ],
    ]));
    handler.initTableHeaders([]);
}
export function conceptRequired(typeName) {
    const c = FreLanguage.getInstance().concept(typeName);
    if (!c) {
        throw new Error(`Concept '${typeName}' not found in language.`);
    }
    return c;
}
export function initializeEditorDef() {
    conceptRequired("Annotation").trigger = "Annotation";
    conceptRequired("Concept").trigger = "Concept";
    conceptRequired("Interface").trigger = "Interface";
    conceptRequired("Containment").trigger = "Containment";
    conceptRequired("Enumeration").trigger = "Enumeration";
    conceptRequired("EnumerationLiteral").trigger = "EnumerationLiteral";
    conceptRequired("PrimitiveType").trigger = "PrimitiveType";
    conceptRequired("Property").trigger = "Property";
    conceptRequired("Reference").trigger = "Reference";
    const conceptProjectionToPropertyProjection = new Map();
}
//# sourceMappingURL=EditorDef.js.map
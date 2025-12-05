import { FreCustomAction, FreNodeReference, } from "@freon4dsl/core";
export const BINARY_EXPRESSION_CREATORS = [];
export const CUSTOM_ACTIONS = [
    FreCustomAction.create({
        trigger: "extends",
        activeInBoxRoles: ["optional-extends"],
        action: (box, trigger, ed) => {
            box.parent.mustShow = true;
            return box.node;
        },
        boxRoleToSelect: "Interface-extends-new-list-item",
    }),
    FreCustomAction.create({
        trigger: "extends",
        activeInBoxRoles: ["optional-extends"],
        action: (box, trigger, ed) => {
            box.parent.mustShow = true;
            return box.node;
        },
        boxRoleToSelect: "Annotation-extends-referencebox",
    }),
    FreCustomAction.create({
        trigger: "implements",
        activeInBoxRoles: ["optional-implements"],
        action: (box, trigger, ed) => {
            box.parent.mustShow = true;
            return box.node;
        },
        boxRoleToSelect: "Annotation-implements-new-list-item",
    }),
    FreCustomAction.create({
        activeInBoxRoles: ["dependsOn"],
        trigger: "language",
        action: (box, trigger, ed) => {
            const parent = box.node;
            const newBase = FreNodeReference.create("", "Language");
            parent.dependsOn.push(newBase);
            return newBase.referred;
        },
    }),
    FreCustomAction.create({
        activeInBoxRoles: ["implements"],
        trigger: "Interface",
        action: (box, trigger, ed) => {
            const parent = box.node;
            const newBase = FreNodeReference.create("", "Interface");
            parent.implements.push(newBase);
            return newBase.referred;
        },
    }),
    FreCustomAction.create({
        activeInBoxRoles: ["implements"],
        trigger: "Interface",
        action: (box, trigger, ed) => {
            const parent = box.node;
            const newBase = FreNodeReference.create("", "Interface");
            parent.implements.push(newBase);
            return newBase.referred;
        },
    }),
    FreCustomAction.create({
        activeInBoxRoles: ["extends"],
        trigger: "Interface",
        action: (box, trigger, ed) => {
            const parent = box.node;
            const newBase = FreNodeReference.create("", "Interface");
            parent.extends.push(newBase);
            return newBase.referred;
        },
    }),
];
//# sourceMappingURL=LionCore_M3DefaultActions.js.map
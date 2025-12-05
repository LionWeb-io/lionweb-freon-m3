import { MobxModelElementImpl, observablepartlist, FreLanguage, AST, notNullOrUndefined, FreUtils, matchElementList, } from "@freon4dsl/core";
import { Language } from "./internal.js";
import { makeObservable, action, runInAction } from "mobx";
export class LionCore_M3 extends MobxModelElementImpl {
    static create(data) {
        const result = new LionCore_M3(data.$id);
        if (notNullOrUndefined(data.name)) {
            result.name = data.name;
        }
        if (notNullOrUndefined(data.units)) {
            data.units.forEach((x) => result.units.push(x));
        }
        if (notNullOrUndefined(data.parseLocation)) {
            result.parseLocation = data.parseLocation;
        }
        return result;
    }
    constructor(id) {
        super();
        this.$typename = "LionCore_M3";
        this.$id = "";
        if (!!id) {
            this.$id = id;
        }
        else {
            this.$id = FreUtils.ID();
        }
        observablepartlist(this, "units");
        makeObservable(this, {
            copy: action,
        });
    }
    freLanguageConcept() {
        return this.$typename;
    }
    freId() {
        return this.$id;
    }
    freIsModel() {
        return true;
    }
    freIsUnit() {
        return false;
    }
    freIsExpression() {
        return false;
    }
    freIsBinaryExpression() {
        return false;
    }
    copy() {
        const result = new LionCore_M3();
        if (notNullOrUndefined(this.name)) {
            result.name = this.name;
        }
        if (notNullOrUndefined(this.units)) {
            this.units.forEach((x) => result.units.push(x.copy()));
        }
        return result;
    }
    match(toBeMatched) {
        let result = true;
        if (result && toBeMatched.name !== null && toBeMatched.name !== undefined && toBeMatched.name.length > 0) {
            result = result && this.name === toBeMatched.name;
        }
        if (result && notNullOrUndefined(toBeMatched.units)) {
            result = result && matchElementList(this.units, toBeMatched.units);
        }
        return result;
    }
    findUnit(name, metatype) {
        let result;
        const checkType = metatype !== undefined;
        result = this.getUnits().find((mod) => mod.name === name && (checkType ? FreLanguage.getInstance().metaConformsToType(mod, metatype) : true));
        if (!!result) {
            return result;
        }
        return undefined;
    }
    addUnit(newUnit) {
        if (!!newUnit) {
            const myMetatype = newUnit.freLanguageConcept();
            switch (myMetatype) {
                case "Language": {
                    AST.changeNamed("addUnit", () => {
                        this.units.push(newUnit);
                    });
                    return true;
                }
            }
        }
        return false;
    }
    removeUnit(oldUnit) {
        if (!!oldUnit) {
            const myMetatype = oldUnit.freLanguageConcept();
            switch (myMetatype) {
                case "Language": {
                    AST.changeNamed("removeUnit", () => {
                        this.units.splice(this.units.indexOf(oldUnit), 1);
                    });
                    return true;
                }
            }
        }
        return false;
    }
    newUnit(typename) {
        switch (typename) {
            case "Language": {
                let unit;
                runInAction(() => {
                    unit = Language.create({});
                });
                if (!unit)
                    throw new Error("Failed to create Language");
                AST.changeNamed("newUnit", () => {
                    this.units.push(unit);
                });
                return unit;
            }
        }
        return undefined;
    }
    getUnits() {
        let result = [];
        result = result.concat(this.units);
        return result;
    }
    getUnitsForType(type) {
        switch (type) {
            case "Language": {
                return this.units;
            }
        }
        return [];
    }
}
//# sourceMappingURL=LionCore_M3.js.map
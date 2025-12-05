import { FreLanguage } from "@freon4dsl/core";
import { ListUtil } from "../../utils/gen/index.js";
import { freonConfiguration } from "../../config/FreonConfiguration.js";
export class LionCore_M3Stdlib {
    static getInstance() {
        if (this.stdlib === undefined || this.stdlib === null) {
            this.stdlib = new LionCore_M3Stdlib();
        }
        return this.stdlib;
    }
    constructor() {
        this.elements = [];
        for (const lib of freonConfiguration.customStdLibs) {
            ListUtil.addAllIfNotPresent(this.elements, lib.elements);
        }
    }
    find(name, metatype) {
        if (!!name) {
            const possibles = this.elements.filter((elem) => elem.name === name);
            if (possibles.length !== 0) {
                if (metatype) {
                    for (const elem of possibles) {
                        if (FreLanguage.getInstance().metaConformsToType(elem, metatype)) {
                            return elem;
                        }
                    }
                }
                else {
                    return possibles[0];
                }
            }
        }
        return undefined;
    }
}
//# sourceMappingURL=LionCore_M3Stdlib.js.map
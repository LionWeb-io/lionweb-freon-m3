import { CustomLionCore_M3Actions, CustomLionCore_M3Projection } from "../editor/index.js";
import { CustomLionCore_M3Scoper } from "../scoper/index.js";
import { CustomLionCore_M3TyperPart } from "../typer/CustomLionCore_M3TyperPart.js";
import { CustomLionCore_M3Validator } from "../validator/index.js";
import { CustomLionCore_M3Stdlib } from "../stdlib/CustomLionCore_M3Stdlib.js";
class FreonConfiguration {
    constructor() {
        this.customProjection = [new CustomLionCore_M3Projection()];
        this.customActions = [new CustomLionCore_M3Actions()];
        this.customValidations = [new CustomLionCore_M3Validator()];
        this.customScopers = [new CustomLionCore_M3Scoper()];
        this.customTypers = [new CustomLionCore_M3TyperPart()];
        this.customStdLibs = [new CustomLionCore_M3Stdlib()];
    }
}
export const freonConfiguration = new FreonConfiguration();
//# sourceMappingURL=FreonConfiguration.js.map
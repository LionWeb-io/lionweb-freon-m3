import { type FreValidator, FreError, type FreNode } from "@freon4dsl/core";
import { type LionCore_M3Worker } from "../../utils/gen/index.js";
export interface LionCore_M3CheckerInterface extends LionCore_M3Worker {
    errorList: FreError[];
}
export declare class LionCore_M3Validator implements FreValidator {
    validate(node: FreNode, includeChildren?: boolean): FreError[];
}
//# sourceMappingURL=LionCore_M3Validator.d.ts.map
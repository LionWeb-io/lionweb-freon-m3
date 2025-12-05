import { ActionsUtil } from "@freon4dsl/core";
import { BINARY_EXPRESSION_CREATORS, CUSTOM_ACTIONS } from "./LionCore_M3DefaultActions.js";
import { MANUAL_BINARY_EXPRESSION_ACTIONS, MANUAL_CUSTOM_ACTIONS } from "../CustomLionCore_M3Actions.js";
export class LionCore_M3Actions {
    constructor() {
        this.binaryExpressionActions = ActionsUtil.join(BINARY_EXPRESSION_CREATORS, MANUAL_BINARY_EXPRESSION_ACTIONS);
        this.customActions = ActionsUtil.join(CUSTOM_ACTIONS, MANUAL_CUSTOM_ACTIONS);
    }
}
//# sourceMappingURL=LionCore_M3Actions.js.map
import { InterpreterContext, MainInterpreter, RtError, } from "@freon4dsl/core";
import { LionCore_M3InterpreterInit } from "./gen/LionCore_M3InterpreterInit.js";
const getPropertyFunction = (node) => {
    const index = node.freOwnerDescriptor().propertyIndex;
    return node.freOwnerDescriptor().propertyName + (index !== undefined ? "[" + index + "]" : "");
};
const getConceptFunction = (node) => {
    if (node === undefined) {
        return "";
    }
    return node.freLanguageConcept();
};
export class MainLionCore_M3Interpreter {
    constructor() {
        MainLionCore_M3Interpreter.getMain();
    }
    static getMain() {
        return (this.main ??= MainInterpreter.instance(LionCore_M3InterpreterInit, getConceptFunction, getPropertyFunction));
    }
    setTracing(value) {
        MainLionCore_M3Interpreter.getMain().setTracing(value);
    }
    getTrace() {
        return MainLionCore_M3Interpreter.getMain().getTrace();
    }
    evaluate(node) {
        return this.evaluateWithContext(node, InterpreterContext.EMPTY_CONTEXT);
    }
    evaluateWithContext(node, ctx) {
        MainLionCore_M3Interpreter.getMain().reset();
        try {
            return MainLionCore_M3Interpreter.getMain().evaluate(node, ctx);
        }
        catch (e) {
            return new RtError(e.message);
        }
    }
}
MainLionCore_M3Interpreter.main = null;
//# sourceMappingURL=MainLionCore_M3Interpreter.js.map
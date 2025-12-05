import { type FreInterpreter, InterpreterContext, InterpreterTracer, RtObject } from "@freon4dsl/core";
export declare class MainLionCore_M3Interpreter implements FreInterpreter {
    private static main;
    constructor();
    private static getMain;
    setTracing(value: boolean): void;
    getTrace(): InterpreterTracer;
    evaluate(node: Object): RtObject;
    evaluateWithContext(node: Object, ctx: InterpreterContext): RtObject;
}
//# sourceMappingURL=MainLionCore_M3Interpreter.d.ts.map
import { type FreReader, type FreModelUnit, type FreNode } from "@freon4dsl/core";
import { LionCore_M3 } from "../../language/gen/index.js";
import { LionCore_M3SyntaxAnalyser } from "./LionCore_M3SyntaxAnalyser.js";
import { type LanguageProcessor } from "net.akehurst.language-agl-processor";
declare class MyContext {
    readonly predefined: Map<string, FreNode>;
    constructor(predefined: Map<string, FreNode>);
}
export declare class LionCore_M3ModelUnitReader implements FreReader {
    analyser: LionCore_M3SyntaxAnalyser;
    parser: LanguageProcessor<LionCore_M3, MyContext> | null | undefined;
    isInitialized: boolean;
    initialize(): void;
    readFromString(sentence: string, metatype: string, model: LionCore_M3, sourceName?: string): FreModelUnit;
}
export {};
//# sourceMappingURL=LionCore_M3ModelUnitReader.d.ts.map
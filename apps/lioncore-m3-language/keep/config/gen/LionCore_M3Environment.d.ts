import { FreEditor, type FreEnvironment, type FreReader, FreCompositeTyper, type FreValidator, type FreWriter, type FreInterpreter, FreCompositeScoper, FreProjectionHandler } from "@freon4dsl/core";
import { LionCore_M3 } from "../../language/gen/index.js";
export declare class LionCore_M3Environment implements FreEnvironment {
    private static environment;
    static getInstance(): FreEnvironment;
    private constructor();
    newModel(modelName: string): LionCore_M3;
    editor: FreEditor;
    scoper: FreCompositeScoper;
    typer: FreCompositeTyper;
    validator: FreValidator;
    writer: FreWriter;
    reader: FreReader;
    interpreter: FreInterpreter;
    projectionHandler: FreProjectionHandler;
    languageName: string;
    fileExtensions: Map<string, string>;
}
//# sourceMappingURL=LionCore_M3Environment.d.ts.map
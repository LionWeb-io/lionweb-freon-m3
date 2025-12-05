import { FreModelUnit } from "@freon4dsl/core";
import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import { Concept } from "../language/gen/index.js";
export declare class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    protected model: CommandLineStringParameter;
    protected lionWebM3File: CommandLineStringParameter;
    protected allModelUnits: FreModelUnit[];
    constructor();
    protected defineParameters(): void;
    protected onExecute(): Promise<void>;
    convertLionCore2Freon(): Promise<string>;
    readModelUnitFromFile(filename: string): void;
    writeAstToFile(filename: string, ast: string): void;
    writeModelToFile(dirname: string, languagename: string, partitions: Concept[]): void;
    createDirIfNotExisting(dir: string): void;
}
//# sourceMappingURL=ConvertLionCoreFolder2FreonAction.d.ts.map
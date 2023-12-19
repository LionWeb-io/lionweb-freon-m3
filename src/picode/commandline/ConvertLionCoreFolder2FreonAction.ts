import { FreLionwebSerializer, FreModelUnit, FreNode, FreNodeReference } from "@freon4dsl/core";
import { CommandLineAction, CommandLineStringListParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import fs from "fs";
import { LwChunk } from "@freon4dsl/core";
import { Concept, Language, LanguageEntity } from "../language/gen/index";

import { LionWeb2FreonTemplate } from "./LionWeb2FreonTemplate";

export class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    protected metamodelfile: CommandLineStringParameter;
    protected lionWebM3File: CommandLineStringListParameter;
    protected allFiles: FreModelUnit[] = [];

    constructor() {
        super({
            actionName: "folder",
            summary: "Create .ast file from LionWeb Meta-model JSON file or folder",
            documentation: "Lionweb to Freon Ast generator"
        });
    }

    protected onDefineParameters(): void {
        this.lionWebM3File = this.defineStringListParameter({
            argumentName: "METAMODEL_FOLDER",
            parameterLongName: "--folder",
            parameterShortName: "-f",
            description: "File or folder containing LionWeb metamodels in json format"
        });
    }

    protected onExecute(): Promise<void> {
        const self = this;
        return new Promise(function (resolve, rejest) {
            const freonString = self.convertLionCore2Freon();
        });
    }
    
    async convertLionCore2Freon(): Promise<string> {
        const modelunits: Set<LanguageEntity> = new Set<LanguageEntity>();
        this.lionWebM3File.values.forEach(mmFile => {
            if (fs.existsSync(mmFile)) {
                const stats = fs.statSync(mmFile);
                if (stats.isDirectory()) {
                    fs.readdirSync(mmFile).forEach(file => {
                        if (file.endsWith(".json") && !file.endsWith("Public.json")) {
                            console.log("Folder Converting file " + file)
                            this.convertFile(mmFile + '/' + file, modelunits);
                        }
                    });
                } else if (stats.isFile()) {
                    if (mmFile.endsWith(".json") && !mmFile.endsWith("Public.json")) {
                        console.log("Converting file " + mmFile)
                        this.convertFile(mmFile, modelunits);
                    }
                } else {
                    console.error(`Argument ${mmFile} is not a directory, nor a folder`);
                }
            }
        });
        this.writeModelToFile("model", modelunits);        
        return "void";
    }
    
    convertFile(filename: string, modelunits: Set<LanguageEntity>) {
        const serialzer = new FreLionwebSerializer();
        let metamodel: LwChunk = JSON.parse(fs.readFileSync(filename).toString());
        // Assume it us a language in the rest of the method
        // TODO call validator to check this.
        const ts = serialzer.toTypeScriptInstance(metamodel);
        const lion2freon = new LionWeb2FreonTemplate();
        const result = lion2freon.generateFreonAst(ts as FreModelUnit);
        this.allFiles.push(ts as FreModelUnit);
        this.writeAstToFile(filename, result);
        
        // check whether there is a modelunit/partition in the file
        (ts as Language).entities.filter(ent => ent.freLanguageConcept() === "Concept" && (ent as Concept).partition)
            .forEach(e => modelunits.add(e));
    }

    writeAstToFile(filename: string, ast: string): void {
        const dotIndex = filename.indexOf('.');
        const astBaseFilename = filename.substring(0);
        fs.writeFileSync(astBaseFilename + ".ast", ast);
    }

    writeModelToFile(filename: string, units: Set<LanguageEntity>): void {
        const model = (new LionWeb2FreonTemplate()).generateModelUnits(units);

        fs.writeFileSync(filename + ".ast", model);
        const ids = (new LionWeb2FreonTemplate()).generate_idJson(this.allFiles);

        fs.writeFileSync("id" + ".json", ids);
    }

}

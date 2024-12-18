import { FreLionwebSerializer, FreModelUnit, FreNode, FreNodeReference } from "@freon4dsl/core";
import { LanguageRegistry, LionWebValidator } from "@lionweb/validation";
import { CommandLineAction, CommandLineStringListParameter, CommandLineStringParameter } from "@rushstack/ts-command-line";
import fs from "fs";
// import { LwChunk } from "@freon4dsl/core";
import { Concept, Language, LanguageEntity } from "../language/gen/index.js";

import { AstTemplate } from "./templates/AstTemplate.js";
import { IdTemplate } from "./templates/IdTemplate.js";

export class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    protected model: CommandLineStringParameter;
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
        this.model = this.defineStringParameter({
            argumentName: "MODEL",
            parameterLongName: "--model",
            parameterShortName: "-m",
            description: "Name of the Freon model to be generated, should usuallbe one of the language names"
        });
    }

    protected onExecute(): Promise<void> {
        const self = this;
        return new Promise(function (resolve, rejest) {
            const freonString = self.convertLionCore2Freon();
        });
    }
    
    async convertLionCore2Freon(): Promise<string> {
        const modelunits: LanguageEntity[] = [];
        let dir = "."
        this.lionWebM3File.values.forEach(mmFile => {
            if (fs.existsSync(mmFile)) {
                const stats = fs.statSync(mmFile);
                if (stats.isDirectory()) {
                    dir = mmFile
                    fs.readdirSync(mmFile).forEach(file => {
                        if (file.endsWith(".json") && !file.includes("Public")) {
                            this.convertFile(mmFile + '/' + file, modelunits, mmFile + "/generated_ast/" + file );
                        }
                    });
                } else if (stats.isFile()) {
                    if (mmFile.endsWith(".json")) {
                        this.convertFile(mmFile, modelunits, mmFile);
                    }
                } else {
                    console.error(`Argument ${mmFile} is not a directory, nor a folder`);
                }
            }
        });
        this.writeModelToFile(dir + "/generated_ast/", modelunits, );        
        return "void";
    }
    
    convertFile(filename: string, modelunits: LanguageEntity[], outfile: string) {
        console.log(`Convert ${filename} to ${outfile}`)
        const serialzer = new FreLionwebSerializer();
        let metamodel= JSON.parse(fs.readFileSync(filename).toString());
        // Assume it us a language in the rest of the method
        // TODO call validator to check this.
        const validator = new LionWebValidator(metamodel, new LanguageRegistry())
        validator.validateSyntax()
        validator.validateReferences()
        if (validator.validationResult.hasErrors()) {
            for(const err of validator.validationResult.issues) {
                console.log("Issue: " + err.errorMsg())
            }
            // return null
        }
        
        const ts = serialzer.toTypeScriptInstance(metamodel);
        const lion2freon = new AstTemplate();
        const result = lion2freon.generateFreonAst(ts as FreModelUnit);
        this.allFiles.push(ts as FreModelUnit);
        this.writeAstToFile(outfile, result);
        
        // check whether there is a modelunit/partition in the file
        modelunits.push(...(ts as Language).entities.filter(ent => ent.freLanguageConcept() === "Concept" && (ent as Concept).partition));
    }

    writeAstToFile(filename: string, ast: string): void {
        const dotIndex = filename.indexOf('.');
        const astBaseFilename = filename.substring(0);
        fs.writeFileSync(astBaseFilename + ".ast", ast);
    }

    writeModelToFile(dirname: string, units: LanguageEntity[]): void {
        const model = (new AstTemplate()).generateModelUnits(this.model.value, units);

        fs.writeFileSync(dirname + "model.ast", model);
        const ids = (new IdTemplate()).generate_idJson(this.allFiles);

        fs.writeFileSync(dirname + "id.json", ids);
    }

}

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
        this.defineParameters()
    }

    protected defineParameters(): void {
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

    protected async onExecute(): Promise<void> {
        const self = this;
        const tmpo = await self.convertLionCore2Freon()
        return null
    }
    
    async convertLionCore2Freon(): Promise<string> {
        const modelunits: LanguageEntity[] = [];
        let dir = "."
        let language: string = "unknownLanguage"
        this.lionWebM3File.values.forEach(mmFile => {
            if (fs.existsSync(mmFile)) {
                const stats = fs.statSync(mmFile);
                if (stats.isDirectory()) {
                    dir = mmFile
                    this.createDirIfNotExisting(mmFile + "/generated_ast")
                    fs.readdirSync(mmFile).forEach(file => {
                        if (file.endsWith(".json")) {
                            language = this.convertFile(mmFile + '/' + file, modelunits, mmFile + "/generated_ast/" + file );
                        } else {
                            console.log(`Ignoring file ${mmFile}, not a json extension`)
                        }
                    });
                } else if (stats.isFile()) {
                    if (mmFile.endsWith(".json")) {
                        language = this.convertFile(mmFile, modelunits, mmFile);
                    } else {
                        console.log(`Skipping file ${mmFile}, not a json extension`)
                    }
                } else {
                    console.error(`ERROR: Argument ${mmFile} is not a directory, nor a folder`);
                }
            } else {
                console.error(`ERROR: File or folder ${mmFile} does not exist`)
            }
        });
        this.writeModelToFile(dir + "/generated_ast/", language, modelunits);        
        return "void";
    }

    /**
     * Converts the file with name _filename_, writes output to _outfile_
     * @param filename
     * @param modelunits
     * @param outfile
     * @returns the name of the language represented in the file.
     */
    convertFile(filename: string, modelunits: LanguageEntity[], outfile: string): string {
        console.log(`Convert ${filename}`)
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
        const firstLanguage = (ts as FreModelUnit).name
        const lion2freon = new AstTemplate();
        const result = lion2freon.generateFreonAst(ts as FreModelUnit);
        this.allFiles.push(ts as FreModelUnit);
        this.writeAstToFile(outfile, result);
        
        // check whether there is a modelunit/partition in the file
        modelunits.push(...(ts as Language).entities.filter(ent => ent.freLanguageConcept() === "Concept" && (ent as Concept).partition));
        return firstLanguage
    }

    writeAstToFile(filename: string, ast: string): void {
        const dotIndex = filename.lastIndexOf('.json');
        const astBaseFilename = filename.split(".json")[0];
        console.log(`Writing to file ${astBaseFilename + ".ast"}`)
        fs.writeFileSync(astBaseFilename + ".ast", ast);
    }

    writeModelToFile(dirname: string, languagename : string, units: LanguageEntity[]): void {
        const model = (new AstTemplate()).generateModelWithUnits(languagename, units);
        this.createDirIfNotExisting(dirname)

        fs.writeFileSync(dirname + "model.ast", model);
        const ids = (new IdTemplate()).generate_idJson(this.allFiles);

        fs.writeFileSync(dirname + "id.json", ids);
    }

    createDirIfNotExisting(dir: string) {
        const parts = dir.split("/");
        let current = ".";
        for (const part of parts) {
            current = current + "/" + part;
            if (!fs.existsSync(current)) {
                console.log("creating folder: [" + current + "] as part of " + dir);
                fs.mkdirSync(current);
            }
        }
    }
}

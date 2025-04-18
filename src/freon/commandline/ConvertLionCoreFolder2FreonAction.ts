import { FreLionwebSerializer, FreModelUnit } from "@freon4dsl/core";
import { LanguageRegistry, LionWebValidator } from "@lionweb/validation";
import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import fs from "fs";
import path from "path"
import { Concept, Enumeration, Language, PrimitiveType } from "../language/gen/index.js";

import { AstTemplate } from "./templates/AstTemplate.js";
import { IdTemplate } from "./templates/IdTemplate.js";

const pathSeparator = path.sep

export class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    protected model: CommandLineStringParameter;
    protected lionWebM3File: CommandLineStringParameter;
    protected allModelUnits: FreModelUnit[] = [];

    constructor() {
        super({
            actionName: "folder",
            summary: "Create .ast file from LionWeb Meta-model JSON folder",
            documentation: "Lionweb to Freon Ast generator"
        });
        this.defineParameters()
    }

    protected defineParameters(): void {
        this.lionWebM3File = this.defineStringParameter({
            argumentName: "METAMODEL_FOLDER",
            parameterLongName: "--folder",
            parameterShortName: "-f",
            description: "Folder containing LionWeb metamodels in json format"
        });
    }

    protected async onExecute(): Promise<void> {
        const self = this;
        await self.convertLionCore2Freon()
        return null
    }
    
    async convertLionCore2Freon(): Promise<string> {
        let language: string = "unknownLanguage"
        const mmFolderName = this.lionWebM3File.value
        if (fs.existsSync(mmFolderName)) {
            const stats = fs.statSync(mmFolderName);
            if (stats.isDirectory()) {
                this.createDirIfNotExisting(mmFolderName + "/generated_ast")
                fs.readdirSync(mmFolderName).forEach(file => {
                    if (file.endsWith(".json")) {
                        this.readModelUnitFromFile(mmFolderName + '/' + file)
                    } else {
                        console.log(`Ignoring file ${mmFolderName}, not a json extension`)
                    }
                });
            } else {
                console.error(`ERROR: Argument ${mmFolderName} is not a directory`);
            }
        } else {
            console.error(`ERROR: File or folder ${mmFolderName} does not exist`)
        }

        this.createDirIfNotExisting(mmFolderName + "/generated_ast")

        const enumerations: string[] = [];
        const primitiveTypes: string[] = [];
        const partitions: Concept[] = []
        for (const ts of this.allModelUnits) {
            // find all enumerations for the mapping to Limited
            (ts as Language).entities.filter(e => e.freLanguageConcept() === "Enumeration").forEach(e => {
                enumerations.push((e as Enumeration).name)
            });
            // find all enumerations for the mapping to Limited
            (ts as Language).entities.filter(e => e.freLanguageConcept() === "PrimitiveType").forEach(e => {
                primitiveTypes.push((e as PrimitiveType).name)
            });
            // find all enumerations for the mapping to Limited
            (ts as Language).entities.filter(e => e.freLanguageConcept() === "Concept" && (e as Concept).partition).forEach(e => {
                partitions.push(e as Concept)
            });
        }

        for (const ts of this.allModelUnits) {
            const lion2freon = new AstTemplate(enumerations, primitiveTypes, partitions);
            const result = lion2freon.generateFreonAst(ts);
            this.writeAstToFile(`${mmFolderName}${pathSeparator}generated_ast${pathSeparator}${ts.name}`, result);
        }
        // Find model name as language name
        const separatorIndex = mmFolderName.lastIndexOf(pathSeparator)
        if (separatorIndex !== -1) {
            language = mmFolderName.substring(separatorIndex + 1)
        } else {
            language = mmFolderName
        }
        
        this.writeModelToFile(mmFolderName + "/generated_ast/", language, partitions);        
        return "void";
    }

    /**
     * 
     */
    readModelUnitFromFile(filename: string): void {
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
        this.allModelUnits.push(ts as FreModelUnit);
    }

    writeAstToFile(filename: string, ast: string): void {
        console.log(`Writing to file ${filename + ".ast"}`)
        fs.writeFileSync(filename + ".ast", ast);
    }

    writeModelToFile(dirname: string, languagename : string, partitions: Concept[]): void {
        const model = (new AstTemplate([], [], [])).generateModelWithUnits(languagename, partitions);
        this.createDirIfNotExisting(dirname)

        fs.writeFileSync(dirname + "model.ast", model);
        const ids = (new IdTemplate()).generate_idJson(this.allModelUnits);

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

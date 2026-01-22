import { FreLionwebSerializer, FreModelUnit } from "@freon4dsl/core";
import { LanguageRegistry, LionWebValidator } from "@lionweb/validation";
import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import fs from "fs";
import path from "path"
import { Concept, Enumeration, Language, PrimitiveType } from "../freon/language/index.js";

import { AstTemplate } from "./templates/AstTemplate.js";
import { IdTemplate } from "./templates/IdTemplate.js";

const pathSeparator = path.sep

/**
 * Action to convert a LionCore Language to a (set of) Freon AST file(s).
 */
export class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    protected lionWebM3File: CommandLineStringParameter;
    protected outputFolder: CommandLineStringParameter;
    protected allModelUnits: FreModelUnit[] = [];

    constructor() {
        super({
            actionName: "generate-freon",
            summary: "Create Freon .ast files from LionWeb Meta-model JSON folder",
            documentation: `Lionweb to Freon Ast generator`
        });
        this.defineParameters()
    }

    protected defineParameters(): void {
        this.lionWebM3File = this.defineStringParameter({
            argumentName: "METAMODEL_FOLDER",
            parameterLongName: "--folder",
            parameterShortName: "-f",
            description: "Folder containing LionWeb metamodels in json format",
            required: true
        });
        this.outputFolder = this.defineStringParameter({
            argumentName: "OUTPOUT_FOLDER",
            parameterLongName: "--output",
            parameterShortName: "-o",
            description: "Folder where Freon AST files are generated.",
            required: true
        });
    }

    protected async onExecute(): Promise<void> {
        const self = this;
        await self.convertLionCore2Freon()
        return null
    }
    
    async convertLionCore2Freon(): Promise<void> {
        let language: string = "unknownLanguage"
        const mmFolderName = this.lionWebM3File.value
        const outFolderName = this.outputFolder.value

        // Find model name as language name
        const separatorIndex = mmFolderName.lastIndexOf(pathSeparator)
        if (separatorIndex !== -1) {
            language = mmFolderName.substring(separatorIndex + 1)
        } else {
            language = mmFolderName
        }

        // Read all the input files
        if (fs.existsSync(mmFolderName)) {
            const stats = fs.statSync(mmFolderName);
            if (stats.isDirectory()) {
                fs.readdirSync(mmFolderName).forEach(file => {
                    if (file.endsWith(".json")) {
                        this.readModelUnitFromFile(mmFolderName + '/' + file)
                    } else {
                        console.log(`Ignoring file ${file}, not a json extension`)
                    }
                });
            } else {
                console.error(`ERROR: Argument ${mmFolderName} is not a directory`);
                return
            }
        } else {
            console.error(`ERROR: File or folder ${mmFolderName} does not exist`)
            return
        }

        // Collect different classifiers in the language
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

        // Generate the output files
        this.createDirIfNotExisting(outFolderName)
        this.createDirIfNotExisting(`${outFolderName}/defs`)
        this.createDirIfNotExisting(`${outFolderName}/util`)
        for (const ts of this.allModelUnits) {
            const lion2freon = new AstTemplate(enumerations, primitiveTypes, partitions);
            const result = lion2freon.generateFreonAst(ts);
            this.writeAstToFile(`${outFolderName}/defs/${pathSeparator}${ts.name}`, result);
        }
        this.writeModelToFile(`${outFolderName}${pathSeparator}`, language, partitions);        
    }

    /**
     * 
     */
    readModelUnitFromFile(filename: string): void {
        const serializer = new FreLionwebSerializer();
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
            return
        }
        const ts = serializer.toTypeScriptInstance(metamodel);
        this.allModelUnits.push(ts as FreModelUnit);
    }

    writeAstToFile(filename: string, ast: string): void {
        console.log(`Writing to file ${filename + ".ast"}`)
        fs.writeFileSync(filename + ".ast", ast);
    }

    writeModelToFile(dirname: string, languagename : string, partitions: Concept[]): void {
        const model = (new AstTemplate([], [], [])).generateModelWithUnits(languagename, partitions);
        this.createDirIfNotExisting(dirname)

        fs.writeFileSync(`${dirname}defs${pathSeparator}model.ast`, model);
        const idTemplate = new IdTemplate();
        const ids = idTemplate.generate_idJson(languagename, this.allModelUnits);

        fs.writeFileSync(`${dirname}defs${pathSeparator}id.json`, ids);
        fs.writeFileSync(`${dirname}util${pathSeparator}keys.ts`, idTemplate.generateKeys());
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

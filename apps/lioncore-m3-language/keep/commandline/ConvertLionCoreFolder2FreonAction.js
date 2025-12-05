import { FreLionwebSerializer } from "@freon4dsl/core";
import { LanguageRegistry, LionWebValidator } from "@lionweb/validation";
import { CommandLineAction } from "@rushstack/ts-command-line";
import fs from "fs";
import path from "path";
import { AstTemplate } from "./templates/AstTemplate.js";
import { IdTemplate } from "./templates/IdTemplate.js";
const pathSeparator = path.sep;
export class ConvertLionCoreFolder2FreonAction extends CommandLineAction {
    constructor() {
        super({
            actionName: "folder",
            summary: "Create .ast file from LionWeb Meta-model JSON folder",
            documentation: "Lionweb to Freon Ast generator"
        });
        this.allModelUnits = [];
        this.defineParameters();
    }
    defineParameters() {
        this.lionWebM3File = this.defineStringParameter({
            argumentName: "METAMODEL_FOLDER",
            parameterLongName: "--folder",
            parameterShortName: "-f",
            description: "Folder containing LionWeb metamodels in json format"
        });
    }
    async onExecute() {
        const self = this;
        await self.convertLionCore2Freon();
        return null;
    }
    async convertLionCore2Freon() {
        let language = "unknownLanguage";
        const mmFolderName = this.lionWebM3File.value;
        if (fs.existsSync(mmFolderName)) {
            const stats = fs.statSync(mmFolderName);
            if (stats.isDirectory()) {
                this.createDirIfNotExisting(mmFolderName + "/generated_ast");
                fs.readdirSync(mmFolderName).forEach(file => {
                    if (file.endsWith(".json")) {
                        this.readModelUnitFromFile(mmFolderName + '/' + file);
                    }
                    else {
                        console.log(`Ignoring file ${file}, not a json extension`);
                    }
                });
            }
            else {
                console.error(`ERROR: Argument ${mmFolderName} is not a directory`);
                return "error";
            }
        }
        else {
            console.error(`ERROR: File or folder ${mmFolderName} does not exist`);
            return "error";
        }
        this.createDirIfNotExisting(mmFolderName + "/generated_ast");
        const enumerations = [];
        const primitiveTypes = [];
        const partitions = [];
        for (const ts of this.allModelUnits) {
            ts.entities.filter(e => e.freLanguageConcept() === "Enumeration").forEach(e => {
                enumerations.push(e.name);
            });
            ts.entities.filter(e => e.freLanguageConcept() === "PrimitiveType").forEach(e => {
                primitiveTypes.push(e.name);
            });
            ts.entities.filter(e => e.freLanguageConcept() === "Concept" && e.partition).forEach(e => {
                partitions.push(e);
            });
        }
        for (const ts of this.allModelUnits) {
            const lion2freon = new AstTemplate(enumerations, primitiveTypes, partitions);
            const result = lion2freon.generateFreonAst(ts);
            this.writeAstToFile(`${mmFolderName}${pathSeparator}generated_ast${pathSeparator}${ts.name}`, result);
        }
        const separatorIndex = mmFolderName.lastIndexOf(pathSeparator);
        if (separatorIndex !== -1) {
            language = mmFolderName.substring(separatorIndex + 1);
        }
        else {
            language = mmFolderName;
        }
        this.writeModelToFile(mmFolderName + "/generated_ast/", language, partitions);
        return "void";
    }
    readModelUnitFromFile(filename) {
        const serialzer = new FreLionwebSerializer();
        let metamodel = JSON.parse(fs.readFileSync(filename).toString());
        const validator = new LionWebValidator(metamodel, new LanguageRegistry());
        validator.validateSyntax();
        validator.validateReferences();
        if (validator.validationResult.hasErrors()) {
            for (const err of validator.validationResult.issues) {
                console.log("Issue: " + err.errorMsg());
            }
        }
        const ts = serialzer.toTypeScriptInstance(metamodel);
        this.allModelUnits.push(ts);
    }
    writeAstToFile(filename, ast) {
        console.log(`Writing to file ${filename + ".ast"}`);
        fs.writeFileSync(filename + ".ast", ast);
    }
    writeModelToFile(dirname, languagename, partitions) {
        const model = (new AstTemplate([], [], [])).generateModelWithUnits(languagename, partitions);
        this.createDirIfNotExisting(dirname);
        fs.writeFileSync(dirname + "model.ast", model);
        const ids = (new IdTemplate()).generate_idJson(this.allModelUnits);
        fs.writeFileSync(dirname + "id.json", ids);
    }
    createDirIfNotExisting(dir) {
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
//# sourceMappingURL=ConvertLionCoreFolder2FreonAction.js.map
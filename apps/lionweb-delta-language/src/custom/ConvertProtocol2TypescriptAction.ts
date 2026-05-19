import { FreLionwebSerializer, FreModelUnit, FREON } from "@freon4dsl/core"
import { LanguageRegistry, LionWebValidator } from "@lionweb/validation";
import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
import fs from "fs";
import path from "path"
import { LanguageEnvironment } from "../freon/index.js"
import { MessageGroup, Types, Protocol } from "../freon/language/index.js"

import { TypeTemplates } from "./templates/TypeTemplates.js"

const pathSeparator = path.sep

/**
 * Html links to the specification of the deltas.
 */
const linkmap: Map<string, string> = new Map<string, string>([
    ["Event", "https://lionWeb.io/specification/delta/delta-api.html#evnt"],
    ["Command", "https://lionWeb.io/specification/delta/delta-api.html#cmd"],
    ["Request", "https://lionWeb.io/specification/delta/delta-api.html#qry"],
    ["Response", "https://lionWeb.io/specification/delta/delta-api.html#qry"]
])

/**
 * Action to convert a Protocol model to
 *   - typescript types, and
 *   - type-definitions useable by the @lionweb/validation package.
 */
export class ConvertProtocol2TypescriptAction extends CommandLineAction {
    protected protocolModelFolder: CommandLineStringParameter;
    protected outputFolder: CommandLineStringParameter;
    protected allModelUnits: FreModelUnit[] = [];
    protected protocol: Protocol = new Protocol();

    constructor() {
        super({
            actionName: "folder",
            summary: "Create .ts file from Delta model in folder",
            documentation: "Lionweb Protocol to TypeScript types generator"
        });
        this.protocolModelFolder = this.defineStringParameter({
            argumentName: "DELTA_MODEL_FOLDER",
            parameterLongName: "--folder",
            parameterShortName: "-f",
            description: "Folder containing protocol definitions in LionWeb json format"
        });
        this.outputFolder = this.defineStringParameter({
            argumentName: "OUTPOUT_FOLDER",
            parameterLongName: "--output",
            parameterShortName: "-o",
            description: "Folder where TypeScript files are generated.",
            required: true
        });
        this.protocol.name = "DeltaProtocol"
        LanguageEnvironment.getInstance()
    }

    protected async onExecuteAsync(): Promise<void> {
        const self = this;
        await self.convertDelta2ts()
        return null
    }

    async convertDelta2ts(): Promise<string> {
        let language: string = "unknownLanguage"
        const protocolFolderName = this.protocolModelFolder.value
        const outFolderName = this.outputFolder.value

        // Read all the inpput files
        if (fs.existsSync(protocolFolderName)) {
            const stats = fs.statSync(protocolFolderName);
            if (stats.isDirectory()) {
                // this.createDirIfNotExisting(protocolFolderName + "/generated_ts")
                fs.readdirSync(protocolFolderName).forEach(file => {
                    if (file.endsWith(".json")) {
                        console.log(`Reading file ${file}`)
                        this.readModelUnitFromFile(protocolFolderName + '/' + file)
                    } else {
                        console.log(`Ignoring file ${file}, not a json extension`)
                    }
                });
            } else {
                console.error(`ERROR: Argument ${protocolFolderName} is not a directory`);
                return "error"
            }
        } else {
            console.error(`ERROR: File or folder ${protocolFolderName} does not exist`)
            return "error"
        }

        // Collect different classifiers in the language
        const messageGroups: MessageGroup[] = []
        const types: Types[] = []
        const localProtocol = this.protocol
        for (const ts of this.allModelUnits) {
            if (ts.freLanguageConcept() === "MessageGroup") {
                messageGroups.push(ts as MessageGroup)
                FREON.astChanger.changeNamed("Add MessageGroup to Protocol", () => {
                    localProtocol.messagegroup.push(ts as MessageGroup)
                })
            } else if (ts.freLanguageConcept() === "Types") {
                types.push(ts as Types)
                FREON.astChanger.changeNamed("Add Types to Protocol", () => {
                    localProtocol.types.push(ts as Types)
                })
            } else {
                console.error(`Unknown model unit type found: ${ts.freLanguageConcept()}`)
            }
        }

        // Write output files
        const outTypes = `${outFolderName}${pathSeparator}types`
        const outDefinitions = `${outFolderName}${pathSeparator}definitions`
        this.createDirIfNotExisting(outFolderName)
        this.createDirIfNotExisting(outTypes)
        this.createDirIfNotExisting(outDefinitions)
        this.protocol.messagegroup.forEach(messageGroup => {
            console.log(`GENERATING message group ${messageGroup.name} to `)
            // const eventDefinitions = messageGroups.find(mg => mg.name === "Event")
            const eventTemplate = new TypeTemplates()
            // const result = eventTemplate.commandTemplate();
            const result = TypeTemplates.pretty("typescript", eventTemplate.commandTemplate(messageGroup, linkmap.get(messageGroup.name)), "Generated from LionWeb Delta Model");
            this.writeToFile(`${outTypes}${pathSeparator}${messageGroup.name}.ts`, result);

            const jsonResult = TypeTemplates.pretty("typescript", eventTemplate.messageGroup2DefinitionTemplate(messageGroup))
            this.writeToFile(`${outDefinitions}${pathSeparator}${messageGroup.name}Definitions.ts`, jsonResult);
        })
        this.protocol.types.forEach(typeDef => {
            console.log(`GENERATING types ${typeDef.name}`)
            // const eventDefinitions = messageGroups.find(mg => mg.name === "Event")
            const eventTemplate = new TypeTemplates()
            const result = TypeTemplates.pretty("typescript", eventTemplate.typeTemplate(typeDef), "Generated from LionWeb Delta Model");
            this.writeToFile(`${outTypes}${pathSeparator}${typeDef.name}.ts`, result);

            const jsonResult = TypeTemplates.pretty("typescript", eventTemplate.types2DefinitionTemplate(typeDef))
            this.writeToFile(`${outDefinitions}${pathSeparator}${typeDef.name}Definitions.ts`, jsonResult);
        })

        return "void";
    }

    /**
     *
     */
    readModelUnitFromFile(filename: string): void {
        const serializer = new FreLionwebSerializer();
        let metamodel = JSON.parse(fs.readFileSync(filename).toString());
        // Assume it us a language in the rest of the method
        // TODO call validator to check this.
        const validator = new LionWebValidator(metamodel, new LanguageRegistry())
        validator.validateSyntax()
        validator.validateReferences()
        if (validator.validationResult.hasErrors()) {
            for (const err of validator.validationResult.issues) {
                console.log("Issue: " + err.errorMsg())
            }
            return
        }

        const ts = serializer.toTypeScriptInstance(metamodel);
        this.allModelUnits.push(ts as FreModelUnit);
    }

    writeToFile(filename: string, tsCode: string): void {
        console.log(`Writing to file ${filename}`)
        fs.writeFileSync(filename, tsCode);
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

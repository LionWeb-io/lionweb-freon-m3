import { CommandLineParser } from "@rushstack/ts-command-line";
export class FreonCommandLine extends CommandLineParser {
    constructor() {
        super({
            toolFilename: "lionweb",
            toolDescription: "Freon toolset for playing with LionWeb."
        });
    }
    onDefineParameters() {
        this.verboseArg = this.defineFlagParameter({
            parameterLongName: "--verbose",
            parameterShortName: "-v",
            description: "Show extra logging detail"
        });
    }
    onExecute() {
        try {
            return super.onExecute();
        }
        catch (e) {
            console.error("Exception in onExecute: " + e.message + "\n" + e.stack);
        }
        return null;
    }
}
//# sourceMappingURL=FreonCommandLine.js.map
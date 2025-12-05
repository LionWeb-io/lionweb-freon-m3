import { CommandLineParser } from "@rushstack/ts-command-line";
export class FreonCommandLine extends CommandLineParser {
    constructor() {
        super({
            toolFilename: "lionweb",
            toolDescription: "Freon toolset for playing with LionWeb.",
        });
        this.verboseArg = this.defineFlagParameter({
            parameterLongName: "--verbose",
            parameterShortName: "-v",
            description: "Show extra logging detail",
        });
    }
    async onExecute() {
        try {
            await super.onExecute();
        }
        catch (e) {
            const err = e instanceof Error ? e : new Error(String(e));
            console.error(`Exception in onExecute: ${err.message}\n${err.stack ?? ""}`);
            throw err;
        }
    }
}
//# sourceMappingURL=FreonCommandLine.js.map
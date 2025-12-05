import { CommandLineAction } from "@rushstack/ts-command-line";
export class DummyAction extends CommandLineAction {
    constructor() {
        super({
            actionName: "template-action",
            summary: "My description",
            documentation: "More description"
        });
        this.dummyParameter = this.defineStringParameter({
            argumentName: "DUMMY_PARAMETER",
            defaultValue: "dummy.value",
            parameterLongName: "--dummy",
            parameterShortName: "-d",
            description: "Dummy parameter, create your own"
        });
    }
    onExecute() {
        const self = this;
        return new Promise(function (resolve, rejest) {
            const result = self.dummyAction();
        });
    }
    async dummyAction() {
        return "Hello World";
    }
}
//# sourceMappingURL=DummyAction.js.map
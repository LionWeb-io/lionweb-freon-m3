import { CommandLineAction, CommandLineStringParameter } from "@rushstack/ts-command-line";
export declare class DummyAction extends CommandLineAction {
    dummyParameter: CommandLineStringParameter;
    constructor();
    protected onExecute(): Promise<void>;
    dummyAction(): Promise<string>;
}
//# sourceMappingURL=DummyAction.d.ts.map
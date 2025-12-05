import { FreEditor, FreCompositeTyper, FreCompositeScoper, FreLanguageEnvironment, FreProjectionHandler, } from "@freon4dsl/core";
import { LionCore_M3, initializeLanguage } from "../../language/gen/index.js";
import { LionCore_M3Actions, initializeEditorDef, initializeProjections } from "../../editor/gen/index.js";
import { initializeScoperDef } from "../../scoper/gen/index.js";
import { initializeTypers } from "../../typer/gen/index.js";
import { LionCore_M3Validator } from "../../validator/gen/index.js";
import { LionCore_M3ModelUnitWriter } from "../../writer/gen/LionCore_M3ModelUnitWriter.js";
import { LionCore_M3ModelUnitReader } from "../../reader/gen/LionCore_M3ModelUnitReader.js";
import { MainLionCore_M3Interpreter } from "../../interpreter/MainLionCore_M3Interpreter.js";
export class LionCore_M3Environment {
    static getInstance() {
        if (this.environment === undefined || this.environment === null) {
            this.environment = new LionCore_M3Environment();
            FreLanguageEnvironment.setInstance(this.environment);
        }
        return this.environment;
    }
    constructor() {
        this.scoper = new FreCompositeScoper();
        this.typer = new FreCompositeTyper("main");
        this.validator = new LionCore_M3Validator();
        this.writer = new LionCore_M3ModelUnitWriter();
        this.reader = new LionCore_M3ModelUnitReader();
        this.interpreter = new MainLionCore_M3Interpreter();
        this.languageName = "LionCore_M3";
        this.fileExtensions = new Map([["Language", "lan"]]);
        const actions = new LionCore_M3Actions();
        const myComposite = new FreProjectionHandler();
        this.editor = new FreEditor(myComposite, this, actions);
        initializeLanguage();
        initializeProjections(myComposite);
        initializeEditorDef();
        initializeScoperDef(this.scoper);
        initializeTypers(this.typer);
        this.projectionHandler = myComposite;
    }
    newModel(modelName) {
        const model = new LionCore_M3();
        model.name = modelName;
        return model;
    }
}
//# sourceMappingURL=LionCore_M3Environment.js.map
import { AST, notNullOrUndefined } from "@freon4dsl/core";
import { LionCore_M3GrammarStr } from "./LionCore_M3Grammar.js";
import { LionCore_M3SyntaxAnalyser } from "./LionCore_M3SyntaxAnalyser.js";
import { LionCore_M3SemanticAnalyser } from "./LionCore_M3SemanticAnalyser.js";
import { Agl, } from "net.akehurst.language-agl-processor";
class MyContext {
    constructor(predefined) {
        this.predefined = predefined;
    }
}
export class LionCore_M3ModelUnitReader {
    constructor() {
        this.isInitialized = false;
    }
    initialize() {
        this.analyser = new LionCore_M3SyntaxAnalyser();
        const res = Agl.getInstance().processorFromString(LionCore_M3GrammarStr, Agl.getInstance().configuration(undefined, (b) => {
            b.syntaxAnalyserResolverResult(() => this.analyser);
        }));
        this.parser = res.processor;
        this.isInitialized = true;
    }
    readFromString(sentence, metatype, model, sourceName) {
        if (!this.isInitialized) {
            this.initialize();
        }
        this.analyser.sourceName = notNullOrUndefined(sourceName) ? sourceName : "";
        let startRule = "";
        if (metatype === "Language") {
            startRule = "Language";
        }
        let unit = null;
        if (this.parser) {
            let parseResult;
            const options = this.parser.optionsDefault();
            AST.change(() => {
                if (this.parser) {
                    if (startRule.length > 0) {
                        options.parse.goalRuleName = startRule;
                        parseResult = this.parser.process(sentence, options);
                    }
                    else {
                        parseResult = this.parser.process(sentence, null);
                    }
                }
            });
            if (notNullOrUndefined(parseResult)) {
                const errors = parseResult.issues.errors.asJsReadonlyArrayView();
                if (errors.length > 0) {
                    errors.map((err) => {
                        let location = ` [${sourceName}:${err.location?.line}:${err.location?.column}]`;
                        let mess = err.message.replace(/^Failed to match \{.*?\} at:\s*\.*\s*/, "Parse error: ");
                        if (!!mess && mess.length > 0) {
                            throw new Error(mess + location);
                        }
                    });
                }
                else {
                    AST.change(() => {
                        if (notNullOrUndefined(parseResult)) {
                            unit = parseResult.asm;
                        }
                    });
                }
                if (notNullOrUndefined(model)) {
                    try {
                        if (!unit) {
                            throw new Error("Parsing produced no unit.");
                        }
                        const u = unit;
                        const name = u.name;
                        if (model.getUnits().some((existing) => existing.name === name)) {
                            throw new Error(`Unit named '${name}' already exists.`);
                        }
                        else {
                            AST.change(() => {
                                model.addUnit(u);
                                const semAnalyser = new LionCore_M3SemanticAnalyser();
                                semAnalyser.correct(u);
                            });
                        }
                    }
                    catch (e) {
                        console.error(e instanceof Error ? e.message : String(e));
                        throw e;
                    }
                }
            }
            if (!unit) {
                throw new Error("Parsing failed to produce a model unit.");
            }
            return unit;
        }
        else {
            throw new Error(`No parser for ${metatype} available: grammar incorrect.`);
        }
    }
}
//# sourceMappingURL=LionCore_M3ModelUnitReader.js.map
import { type FreNode } from "@freon4dsl/core";
import { type LionCore_M3Worker, LionCore_M3DefaultWorker } from "../../utils/gen/index.js";
export declare class LionCore_M3SemanticAnalysisWalker extends LionCore_M3DefaultWorker implements LionCore_M3Worker {
    changesToBeMade: Map<FreNode, FreNode>;
    constructor(changesToBeMade: Map<FreNode, FreNode>);
    private findReplacement;
}
//# sourceMappingURL=LionCore_M3SemanticAnalysisWalker.d.ts.map
import { FreProjection, FreCombinedActions, FreTyper, FreStdlib, FreScoper } from "@freon4dsl/core";
import { LionCore_M3CheckerInterface } from "../validator/gen/index.js";
declare class FreonConfiguration {
    customProjection: FreProjection[];
    customActions: FreCombinedActions[];
    customValidations: LionCore_M3CheckerInterface[];
    customScopers: FreScoper[];
    customTypers: FreTyper[];
    customStdLibs: FreStdlib[];
}
export declare const freonConfiguration: FreonConfiguration;
export {};
//# sourceMappingURL=FreonConfiguration.d.ts.map
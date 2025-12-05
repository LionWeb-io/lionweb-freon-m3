import { LionCore_M3Environment } from "../config/gen/LionCore_M3Environment.js";
import { ConvertLionCoreFolder2FreonAction } from "./ConvertLionCoreFolder2FreonAction.js";
import { FreonCommandLine } from "./FreonCommandLine.js";
const tmp = LionCore_M3Environment.getInstance();
const cli = new FreonCommandLine();
cli.addAction(new ConvertLionCoreFolder2FreonAction());
await cli.executeAsync();
//# sourceMappingURL=FreonCommandLineRunner.js.map
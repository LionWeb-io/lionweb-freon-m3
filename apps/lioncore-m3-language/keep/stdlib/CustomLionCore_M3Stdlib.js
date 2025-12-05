import { PrimitiveType } from "../language/gen/index.js";
export class CustomLionCore_M3Stdlib {
    get elements() {
        return this.library;
    }
    constructor() {
        this.library = [];
        const booleanType = new PrimitiveType("LionCore-builtins-Boolean");
        booleanType.name = "Boolean";
        this.library.push(booleanType);
        const stringType = new PrimitiveType("LionCore-builtins-String");
        stringType.name = "String";
        this.library.push(stringType);
        const integerType = new PrimitiveType("LionCore-builtins-Integer");
        integerType.name = "Integer";
        this.library.push(integerType);
        const jsonType = new PrimitiveType("LionCore-builtins-JSON");
        jsonType.name = "JSON";
        this.library.push(jsonType);
    }
}
//# sourceMappingURL=CustomLionCore_M3Stdlib.js.map
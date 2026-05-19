import { mount } from 'svelte'
import { FlowbiteFreonLayout, WebappConfigurator, setDevelopment } from "@freon4dsl/weblib-flowbite"
import { configureExternals } from "./external/externals.js"
import { LanguageEnvironment } from "./freon/index.js";
import { configureLoggers } from "./loggers.js"
import { CoreConfig, ServerCommunication } from "@freon4dsl/core"

/**
 * Initialize everything
 */
ServerCommunication.getInstance().SERVER_URL = "http://localhost:8001/"
CoreConfig.initialize(
    LanguageEnvironment.getInstance(),
    ServerCommunication.getInstance(),
)
WebappConfigurator.getInstance()

// ServerCommunication.getInstance().SERVER_URL = "http://localhost:8001/"

setDevelopment(true)
configureExternals()
configureLoggers()

const app = mount(FlowbiteFreonLayout, {
    target: document.getElementById('freon')!,
})

export default app


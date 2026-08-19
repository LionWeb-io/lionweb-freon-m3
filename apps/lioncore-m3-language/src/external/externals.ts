import { Button } from '../lib/components/ui/button/index.js';
import Accordion   from "../lib/components/ui/Accordion.svelte";
import { setCustomComponents } from "@freon4dsl/core-svelte";
import Tab from "../lib/components/ui/Tab.svelte";


/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
}

setCustomComponents([
    {component: Button, knownAs: "EButton"},
    {component: Accordion, knownAs: "ExternalAccordion"},
    // {component: ECollapsible, knownAs: "ECollapsible"},
    {component: Tab, knownAs: "ETab"},
]);

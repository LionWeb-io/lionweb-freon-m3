import { setCustomComponents } from "@freon4dsl/core-svelte";
import ECollapsible        from "../lib/components/ui/collapsible/ECollapsible.svelte";
import ExternalAccordion   from "../lib/components/ui/accordion/ExternalAccordion.svelte";
import { Button } from '../lib/components/ui/button/index.js';
import DatePicker from "../lib/components/ui/datepicker/DatePicker.svelte";
import PersonIcon from "../lib/components/ui/person/PersonIcon.svelte";
import PhoneButton from "../lib/components/ui/person/PhoneButton.svelte";
import TabComponent from "../lib/components/ui/tabs/TabComponent.svelte";


/**
 * Configure the external components used, so Freon can find them.
 */
export function configureExternals() {
}

setCustomComponents([
    {component: Button, knownAs: "EButton"},
    {component: ExternalAccordion, knownAs: "ExternalAccordion"},
    {component: ECollapsible, knownAs: "ECollapsible"},
    {component: DatePicker, knownAs: "EDatePicker"},
    {component: TabComponent, knownAs: "ETab"},
    { component: PersonIcon, knownAs: "PersonIcon" },
    { component: PhoneButton, knownAs: "PhoneButton" },
]);

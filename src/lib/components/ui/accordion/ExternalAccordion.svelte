<script lang="ts">
    import { AST, FreLanguage, type FreNode, notNullOrUndefined, PartListReplacerBox } from "@freon4dsl/core";
    import {type FreComponentProps, RenderComponent} from "@freon4dsl/core-svelte";
    import { Plus } from "@lucide/svelte";
    import { cn } from "../../../utils";
    import { tick } from "svelte"
    import { Button } from "../shadcn-button/index";
    import * as Accordion from "./index.js";

    // The RenderComponent assumes that every svelte component has 'box' and 'editor' as parameters
    // Props
    let { editor, box }: FreComponentProps<PartListReplacerBox> = $props();

    let headerContent: string[] = $state([]);
    // <html>Svelte: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'FreNode'.<br/>No index signature with a parameter of type 'string' was found on type 'FreNode'.
    let openItem = $state<string>()
    
    function initialize() {
        let multipleStr: string | undefined = box.findParam("multi");
        let tmpHeaderContent: string[] = []; // to avoid triggering the effect multiple times.
        for (let i = 0; i < box.children.length; i++) {
            // this also sets the length of panelOpen!
            // panelOpen[i] = false;
            box.children[i].isVisible = false; // the child boxes are not currently shown
            // We know that node is of type FreNamedNode, because this component is only used to
            // show 'parts: InsurancePart[]', so we ignore the compiler error.
            // This is also the reason that we determine the header content here.
            // Within the html part of this component we cannot use ts-ignore.
            // @ts-ignore
            tmpHeaderContent.push(box.children[i].node["name"]);
        }
        headerContent = tmpHeaderContent;
    }

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        // divElement.focus();
    }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
        console.log("REFRESH ExternalAccordion")
    };
    $effect( () => {
        // console.log(`EFFECT ExternalAccordion box id ${box.id}`)
        // box.setFocus = setFocus;
        box.refreshComponent = refresh;
        initialize()
    });

    const addEntity = async () => {
        // Note that you need to put any changes to the actual model in a 'AST.change or AST.changeNamed',
        // because all elements in the model are reactive using mobx.
        const creator = FreLanguage.getInstance().concept(ConceptName)?.creator
        if (creator === undefined) {
            editor.setUserMessage(`Cannot create concept: ${ConceptName}`)
        } else {
            let tmp: FreNode | undefined = undefined;
            AST.change(() => {
                let newEntity = creator({});
                tmp = newEntity
                if (newEntity !== undefined) {
                    box.getPropertyValue().push(newEntity as FreNode);
                }
            });
            if (tmp == undefined) {
                editor.setUserMessage(`Creating concept ${ConceptName} failed`)
            } else {
                openItem = `item-${box.getPropertyValue().length - 1}`
                await tick()
                editor.selectFirstEditableChildBox(tmp)
            }
        }
    }

    // Stuff to type correctly
    const param = box.findParam("noOpen")
    let openType: "single" | "multiple" = $state( "single")
    if (notNullOrUndefined(param)) {
        if (param === "single") openType = "single"
        if (param === "multiple") openType = "multiple"
    }
    const ConceptName = box.findParam("conceptName") ?? "Unknown Type";

</script>

<div>
    <Accordion.Root type={openType} class="p-0" bind:value={openItem}>
        {#each box.children as childBox, index}
            {#snippet header()}
                <span class="min-w-120 text-black dark:text-white" >
                    <span class="text-primary-700 dark:text-primary-100">{headerContent[index]}</span>
                </span>
            {/snippet}
            <Accordion.Item value="item-{index}" class="p-0 border-none">
                <Accordion.Trigger  >{@render header()}</Accordion.Trigger>
                <Accordion.Content 
                        class="p-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-visible text-sm tracking-[-0.01em]"
                >
                    <RenderComponent box={childBox} editor={editor} />
                </Accordion.Content>
            </Accordion.Item>
        {/each}
    </Accordion.Root>
    <Button
            variant="outline"
            onclick={addEntity}
            class={cn(
          " justify-start text-left font-normal accordion-button"
        )}
    >
        <Plus class="mr-0 size-4" />
        {ConceptName}
    </Button>
</div>

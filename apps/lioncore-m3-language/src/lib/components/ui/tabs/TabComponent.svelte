<script lang="ts">
    import { AST, FreLanguage, type FreNode, isEmpty, PartListReplacerBox, } from "@freon4dsl/core";
    import  { type FreComponentProps, RenderComponent } from "@freon4dsl/core-svelte";
    import { Plus } from "@lucide/svelte";
    import { tick } from "svelte";
    import { cn } from "../../../utils";
    import { Button } from "../shadcn-button/index";
    import * as Tabs from "../tabs/index.js";

    let { editor, box }: FreComponentProps<PartListReplacerBox> = $props();
    let headerContent: string[] = $state([]);
    let activeTab = $state<string>("item-0")
    const ConceptName = box.findParam("conceptName") ?? "Unknown Type";

    function initialize() {
        let tmpHeaderContent: string[] = []; // to avoid triggering the effect multiple times.
        for (let i = 0; i < box.children.length; i++) {
            // this also sets the length of panelOpen!
            // panelOpen[i] = false;
            // box.children[i].isVisible = false; // the child boxes are not currently shown
            // We know that node is of type FreNamedNode, because this component is only used to
            // show 'parts: InsurancePart[]', so we ignore the compiler error.
            // This is also the reason that we determine the header content here.
            // Within the html part of this component we cannot use ts-ignore.
            // @ts-ignore
            const header = box.children[i].node["name"]
            tmpHeaderContent.push(isEmpty(header) ? "<no name>" : header);
        }
        headerContent = tmpHeaderContent;
    }
    
    $effect( () => {
        console.log(`activeValue is now ${activeTab}`)
        initialize()

    })
    const onValueChange = (v: string) => {
        activeTab = v
        console.log(`onValueChange ${v}`)
    }
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
                activeTab = `item-${box.getPropertyValue().length - 1}`
                await tick()
                editor.selectFirstEditableChildBox(tmp)
            }
        }
    }
    const tabactive = "tab-active"
    const tabinactive = "tab-inactive"
    
</script>

<div>
    <Tabs.Root class="tab-main" onValueChange={onValueChange} bind:value={activeTab}>
        <Tabs.List class="tab-header">
            {#each box.children as childBox, index}
                <Tabs.Trigger class="tab-tab {(activeTab === `item-${index}` ? tabactive : tabinactive)}" value="item-{index}">{headerContent[index]}</Tabs.Trigger>
            {/each}
        </Tabs.List>
        {#each box.children as childBox, index}
            <Tabs.Content value="item-{index}" class="tab-content">
                <RenderComponent box={childBox} editor={editor} />
            </Tabs.Content>
        {/each}
    </Tabs.Root>
    <Button
            variant="outline"
            onclick={addEntity}
            class={cn(
          " justify-start text-left font-normal tab-button"
        )}
    >
        <Plus class="mr-0 size-4" />
        {ConceptName}
    </Button>
</div>

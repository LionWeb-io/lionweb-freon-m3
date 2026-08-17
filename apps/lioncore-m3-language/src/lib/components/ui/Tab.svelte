<script lang="ts">
import { tick } from "svelte"
import { PartListReplacerBox } from "@freon4dsl/core";
import { type FreComponentProps, RenderComponent } from "@freon4dsl/core-svelte";

let { editor, box }: FreComponentProps<PartListReplacerBox> = $props();

let ch = $state([...box.children])

async function setFocus(): Promise<void> {
    // for( let i=0; i < box.children.length; i++) {
    //     if (panelOpen[i]) {
    //         box.children[i].setFocus();
    //     }
    // }
}

const refresh = async (why?: string): Promise<void> => {
    console.log("REFRESH TAB")
    box.children[selectedTab].refreshComponent("From Tab")
};

$effect(() => {
    // $inspect.trace(`accordion for $effect ${box.children.length} id ${box.id}`)
    // console.log(`========== $effect ${box.children.length} id ${box.id}` )
    box.setFocus = setFocus;
    box.refreshComponent = refresh;
    // Needed to get an effect
    ch = [...box.children]

});

let selectedTab: number = $state(0)

const onclick = async (ve: MouseEvent, index: number) : Promise<void> => {
    console.log("Mouse press")
    selectedTab = index
    ve.stopPropagation()
}

refresh("From Component itself")

</script>

<div class="d-tabs d-tabs-sm">
    {#each ch as childBox, index}
        <input type="radio" name="my_tabs" class="d-tab border rounded border-amber-700 bg-amber-100 dark:bg-blue-600" aria-label={(childBox.node as any)["name"]} onclick={(e: MouseEvent) => onclick(e, index)}  checked={index === selectedTab}/>
        {#if index === selectedTab}
            <div class="d-tab-content bg-base-200 dark:bg-blue-600 p-1">
                <RenderComponent box={childBox} editor={editor} />
            </div>
        {/if}
    {/each}
</div>

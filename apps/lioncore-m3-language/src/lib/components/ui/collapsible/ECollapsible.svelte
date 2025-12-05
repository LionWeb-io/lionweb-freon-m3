<script lang="ts">
    import {type FreComponentProps, RenderComponent} from "@freon4dsl/core-svelte";
    import * as Collapsible from "./index.js";
    import { FragmentWrapperBox, isNullOrUndefined } from "@freon4dsl/core";
    
    // Props
    let { editor, box}: FreComponentProps<FragmentWrapperBox>   = $props();

    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        box.childBox.setFocus();
    }
    const refresh = (why?: string): void => {
        // do whatever needs to be done to refresh the elements that show information from the model
    };
    $effect(() => {
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
    });
    let openParam = box.findParam("state")
    let isOpen = $state(isNullOrUndefined(openParam)?false : openParam === "open" )
    function getOpen() {
        return isOpen;
    }

    function setOpen(newOpen: boolean) {
        isOpen = newOpen;
    }
    let basetext = box.findParam("text") ?? "Click"
    let text = $derived( (isOpen ? "Hide" : "Show")
    )
    //<img src="./show-svgrepo-com.svg" class="ecollapsible-img"/>
    
</script>

<div>
    <div class="ecollapsible`">
        <Collapsible.Root  bind:open={getOpen, setOpen}>
            <Collapsible.Trigger>
                <span  class="[&>svg]:size-4">
                    {text} {basetext}
                </span>
            </Collapsible.Trigger>
            <Collapsible.Content>
                <RenderComponent box={box.childBox} editor={editor} />
            </Collapsible.Content>
        </Collapsible.Root>
    </div>
</div>

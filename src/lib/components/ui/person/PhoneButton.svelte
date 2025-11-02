<script lang="ts">
    import { Plus } from "@lucide/svelte";
    import { Toast } from "flowbite-svelte";
    import { PhoneOutline } from 'flowbite-svelte-icons';
    import { type FreComponentProps, RenderComponent } from "@freon4dsl/core-svelte";
    import { StringWrapperBox } from "@freon4dsl/core";
    import { PhoneOutgoing } from "@lucide/svelte/icons"
    import { cn } from "../../../utils";
    import { Button } from "../shadcn-button/index";

    // Props
    let { editor, box }: FreComponentProps<StringWrapperBox> = $props();

    let clicked: number = 0;
    let showToast: boolean = $state(false);

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

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      'bg-light-base-600 					dark:bg-dark-base-200 ';
</script>

<div class="wrapper">
    Phone number: <RenderComponent box={box.childBox} editor={editor}/>
    <Button 
            tabindex={-1}
            variant="outline"
            class="phone-button"
            onclick={() => {clicked++; showToast = true}}>
    <PhoneOutgoing size={16} class="phone-outgoing" />
    </Button>
</div>
<!--<Button-->
<!--        variant="outline"-->
<!--        onclick={addEntity}-->
<!--        class={cn(-->
<!--          " justify-start text-left font-normal accordion-button"-->
<!--        )}-->
<!--&gt;-->
<!--    <Plus class="mr-0 size-4" />-->
<!--    {ConceptName}-->
<!--</Button>-->

{#if showToast}
    <Toast color="green" onclick={() => showToast = false}>
        This person has been called on number {box.getPropertyValue()}.
        {#snippet icon()}
            <PhoneOutgoing class="phone-outgoing" />
        {/snippet}
    </Toast>
{/if}

<style>
    .wrapper {
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
</style>

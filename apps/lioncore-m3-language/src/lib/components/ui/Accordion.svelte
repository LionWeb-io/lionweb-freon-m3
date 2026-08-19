<script lang="ts">
    import { FREON, PartListReplacerBox } from "@freon4dsl/core";
    import { type FreComponentProps, RenderComponent } from "@freon4dsl/core-svelte";
    import { UserAddOutline } from 'flowbite-svelte-icons';
    import { Concept } from "../../../freon/index";
    // This property is a parts list, therefore the external box to use is an PartListReplacerBox.
    // Props
    let { editor, box }: FreComponentProps<PartListReplacerBox> = $props();

    let multiplePar: boolean = $state(false);   // Indicates whether multiple panels may be open at the same time.

    let ch = $state([...box.children])
    // The following three functions need to be included for the editor to function properly.
    // Please, set the focus to the first editable/selectable element in this component.
    async function setFocus(): Promise<void> {
        // for( let i=0; i < box.children.length; i++) {
        //     if (panelOpen[i]) {
        //         box.children[i].setFocus();
        //     }
        // }
    }
    const refresh = (why?: string): void => {
        console.log("REFRESH ACCORDION")
        // do whatever needs to be done to refresh the elements that show information from the model
        // untrack( () => initialize() );
    };
    const addConcept = () => {
        // Note that you need to put any changes to the actual model in a 'FREON.astChanger.change or FREON.astChanger.changeNamed',
        // because all elements in the model are reactive using mobx.
        FREON.astChanger.change(() => {
            let newPerson: Concept = Concept.create({});
            box.getPropertyValue().push(newPerson);
        });
    }

    const removePerson = (index: number) => {
        // Note that you need to put any changes to the actual model in a 'FREON.astChanger.change' or
        // 'FREON.astChanger.changeNamed', because all elements in the AST model are reactive using mobx.
        FREON.astChanger.change(() => {
            box.getPropertyValue().splice(index, 1);
        });
    }

    $effect(() => {
        // $inspect.trace(`accordion for $effect ${box.children.length} id ${box.id}`)
        // console.log(`========== $effect ${box.children.length} id ${box.id}` )
        box.setFocus = setFocus;
        box.refreshComponent = refresh;
        // Needed to get an effect
        ch = [...box.children]
     
    });

    const colorCls: string = 'text-light-base-50 dark:text-dark-base-900 ';
    const buttonCls: string =
      // 'bg-light-base-400 dark:bg-dark-base-200 ' +
      'hover:bg-light-base-900 		dark:hover:bg-dark-base-50 ' +
      'border-light-base-300 			dark:border-dark-base-800 ';
    const iconCls: string = 'ms-0 inline h-6 w-6';
    
    const onclick = (ve: MouseEvent) : void => {
        console.log("!!")
        ve.stopPropagation()
        
    }
</script>

<div>
        {#each ch as childBox, index}
            <details class="d-collapse d-collapse-arrow  bg-base-100 border border-base-800" name="my-accordion-det-1" open onclick={onclick} >
                <summary class="d-collapse-title rounded-t-lg font-medium text-sm p-1 bg-amber-100 dark:bg-blue-600">{childBox.node.freLanguageConcept()} {childBox.node.freId()}</summary>
                <div class="bg-light-base-50 dark:bg-dark-base-800 d-collapse-content p-0 text-sm">
                    <RenderComponent box={childBox} editor={editor} />
                </div>
            </details>
        {/each}

<!--    <IconButton class="material-icons" onclick={() => addPerson()}>add</IconButton>-->
    <button tabindex={-1} id="add-button" class=" bg-light-base-100 dark:bg-dark-base-200 {buttonCls} {colorCls} " name="addPerson" onclick={() => addConcept()}>
        <UserAddOutline class="{iconCls}" />
    </button>
</div>

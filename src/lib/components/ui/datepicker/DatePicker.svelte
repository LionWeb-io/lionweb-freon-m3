<script lang="ts">
    import { isEmpty, StringReplacerBox } from "@freon4dsl/core";
    import type { FreComponentProps } from "@freon4dsl/core-svelte";
    import CalendarIcon from "@lucide/svelte/icons/calendar";
    import {
        type DateValue,
        DateFormatter,
        getLocalTimeZone, today, parseDate,
    } from "@internationalized/date";
    import { cn } from "../../../utils.js";
    import { Button } from "../shadcn-button/index.js";
    import { Calendar } from "../calendar/index.js";
    import * as Popover from "../popover/index.js";

    let { editor, box, ...props }: FreComponentProps<StringReplacerBox> = $props();

    const df = new DateFormatter("en-US", {
        dateStyle: "long",
    });
    let propValue = (isEmpty(box.getPropertyValue()) ? today(getLocalTimeZone()) : parseDate(box.getPropertyValue()))
    // propValue = parseDate("2022-01-03")
    let value = $state<DateValue>(propValue);
    $effect( () => {
        console.log(`VALUE DATE is now ${value.toString()}`)
        box.setPropertyValue(value.toString())
    })
</script>

<Popover.Root>
    <Popover.Trigger class="datepicker-button">
        {#snippet child({ props })}
            <Button 
                    variant="outline"
                    class={cn(
          "w-[280px] justify-start text-left font-normal ",
          !value && "text-muted-foreground"
        )}
                    {...props}
            >
                <CalendarIcon class="mr-0 size-4" />
                {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
            </Button>
        {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto p-0 datepicker-widget">
        <Calendar bind:value type="single" initialFocus />
    </Popover.Content>
</Popover.Root>

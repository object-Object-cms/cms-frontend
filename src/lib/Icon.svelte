<script lang="ts">
    import { createPopper, Instance } from "@popperjs/core";

    let container: HTMLDivElement | undefined;
    let tooltipElem: HTMLSpanElement | undefined;
    let lastPopper: Instance | undefined;

    export let tooltip: string | undefined = undefined;

    $: {
        lastPopper?.destroy();
        if (container && tooltipElem) {
            lastPopper = createPopper(container, tooltipElem);
        }
    }
</script>

<div class="icon group relative" bind:this={container} on:click>
    <span class="material-icons"><slot /></span>
    {#if tooltip}
        <div
            class="pointer-events-none invisible absolute z-50 p-1 opacity-0
                transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-hover:delay-1000"
            bind:this={tooltipElem}
        >
            <div
                class="w-max rounded-sm bg-black bg-opacity-60 px-2 py-1 font-medium text-white"
            >
                {tooltip}
            </div>
        </div>
    {/if}
</div>

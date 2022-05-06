<script lang="ts">
    import DynamicComponent, {
        ComponentDescriptor
    } from "./DynamicComponent.svelte";

    export let components: (ComponentDescriptor | string)[];
</script>

{#each components as component}
    {#if typeof component === "object"}
        <DynamicComponent descriptor={component} />
    {:else}
        {component}
    {/if}
{/each}

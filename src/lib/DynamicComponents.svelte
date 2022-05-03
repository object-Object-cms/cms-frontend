<script lang="ts">
    import DynamicComponent from "./DynamicComponent.svelte";

    export let components: any[];
</script>

{#each components as component}
    {#if typeof component === "object"}
        <DynamicComponent descriptor={component} />
    {:else}
        {component}
    {/if}
{/each}

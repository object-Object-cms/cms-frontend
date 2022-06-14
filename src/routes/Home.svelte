<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import DynamicComponent from "../lib/DynamicComponent.svelte";
    import { getCorePage } from "../Server";
</script>

{#await getCorePage("HOME")}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then component}
    <DynamicComponent descriptor={component} />
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load home due to: {error}
    </p>
{/await}

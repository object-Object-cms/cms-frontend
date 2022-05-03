<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import DynamicComponent from "../lib/DynamicComponent.svelte";
</script>

{#await fetch("dummydata/test.json").then((n) => n.json())}
    <LoadIndicator />
{:then component}
    <DynamicComponent descriptor={component} />
{/await}

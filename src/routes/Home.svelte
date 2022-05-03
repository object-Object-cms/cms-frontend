<script lang="ts">
    import DynamicComponent from "../lib/DynamicComponent.svelte";
</script>

{#await fetch("dummydata/test.json").then((resp) => resp.json())}
    <p>loading</p>
{:then component}
    <DynamicComponent descriptor={component} />
{/await}

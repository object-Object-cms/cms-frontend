<script lang="ts">
    import DynamicComponent from "./DynamicComponent.svelte";
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper";
    import DynamicComponents from "./DynamicComponents.svelte";
    import NamedComponents from "./components";

    type InGridComponent = {
        x: number;
        y: number;
        w: number;
        h: number;
        component: any;
    };

    export let subComponents: InGridComponent[];
    export let editingMode = true;

    const COLS = 6;
    const cols = [[1100, COLS]];
    let mappedComponents = subComponents.map((n) => ({
        [COLS]: gridHelp.item({ ...n, fixed: !editingMode }),
        component: n.component
    }));
</script>

<div class="flex">
    <Grid
        bind:items={mappedComponents}
        rowHeight={200}
        {cols}
        let:item
        let:dataItem
    >
        <DynamicComponent descriptor={dataItem.component} />
    </Grid>
</div>

{#if editingMode}
    <div class="pointer-events-none fixed top-16 left-0 h-screen w-screen">
        <div class="h-32 w-96 bg-teal-400">
            {#each Object.entries(NamedComponents) as [name, component]}
                <p>{name}</p>
            {/each}
        </div>
    </div>
{/if}

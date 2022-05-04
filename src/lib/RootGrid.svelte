<script lang="ts">
    import DynamicComponent from "./DynamicComponent.svelte";
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper";
    import DynamicComponents from "./DynamicComponents.svelte";
    import NamedComponents, { ComponentsProps } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";

    type InGridComponent = {
        x: number;
        y: number;
        w: number;
        h: number;
        component: any;
        id: string;
    };

    export let subComponents: InGridComponent[];
    export let editingMode = true;
    export let selected: InGridComponent | null = null;

    const COLS = 6;
    const cols = [[1100, COLS]];
    let mappedComponents;
    $: mappedComponents = subComponents.map((n) => ({
        [COLS]: gridHelp.item({ ...n, fixed: !editingMode }),
        component: n.component
    }));
</script>

<div
    class="flex"
    style="height: calc( 100% - 2rem );"
    on:click={() => (selected = null)}
>
    <Grid bind:items={mappedComponents} rowHeight={200} {cols} let:dataItem>
        {#if editingMode}
            <div
                on:click={(e) => {
                    selected = dataItem;
                    e.stopPropagation();
                }}
                class={`w-full ${
                    selected === dataItem.id
                        ? "border-red-500"
                        : "border-slate-500"
                } relative h-full w-full rounded-sm border-2 border-solid`}
            >
                <button
                    class="absolute top-2 right-2 z-50 h-8 w-8 rounded-full bg-slate-500 text-red-500"
                    on:click={() =>
                        (subComponents = subComponents.filter(
                            (n) => n.component !== dataItem.component
                        ))}>X</button
                >
                <DynamicComponent descriptor={dataItem.component} />
            </div>
        {:else}
            <DynamicComponent descriptor={dataItem.component} />
        {/if}
    </Grid>
</div>

{#if editingMode}
    <div
        class="fixed bottom-0 m-8 h-16 rounded-md bg-slate-500"
        style="width: calc( 100% - 4rem );"
    >
        {#each Object.entries(ComponentsProps) as [name, proto]}
            <button>{name}</button>
        {/each}
    </div>
    <div class="fixed right-8 top-32 flex h-96 w-64 rounded bg-slate-500">
        {#if selected !== null}
            <div class="w-full p-4">
                <h1 class="border-l">Editing: {selected.component.name}</h1>
                <ComplexValueEdit
                    bind:value={selected.component.props}
                    proto={ComponentsProps[selected.component.name]}
                />
            </div>
        {:else}
            <div class="w-full min-h-full flex justify-center items-center">
                <p>No item selected</p>
            </div>
        {/if}
    </div>
{/if}

<script lang="ts">
    import DynamicComponent from "./DynamicComponent.svelte";
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper";
    import NamedComponents, { ComponentsProps } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";
    import Icon from "./Icon.svelte";
    import ComponentButton from "./ComponentButton.svelte";
    import DynamicComponents from "./DynamicComponents.svelte";

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
    let mappedComponents = subComponents.map((n) => {
        return {
            [COLS]: gridHelp.item(n),
            component: n.component,
            id: crypto.randomUUID()
        };
    });
    $: subComponents.forEach((n) => ((n as any).fixed = !editingMode));

    let leftSidebarExpanded = true;

    function toggleLeftSidebar() {
        leftSidebarExpanded = !leftSidebarExpanded;
    }
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
                    selected === dataItem
                        ? "border-red-500"
                        : "border-slate-500"
                } relative h-full w-full rounded-sm border-2 border-solid`}
            >
                <div
                    class="absolute top-2 right-2 z-50 rounded-full bg-slate-400 text-red-500"
                >
                    <Icon
                        on:click={() => {
                            subComponents = subComponents.filter(
                                (n) => n.component !== dataItem.component
                            );
                            mappedComponents = mappedComponents.filter(
                                (n) => n.component !== dataItem.component
                            );
                        }}
                    >
                        clear
                    </Icon>
                </div>
                <span class="pointer-events-none contents">
                    <DynamicComponent descriptor={dataItem.component} />
                </span>
            </div>
        {:else}
            <DynamicComponent descriptor={dataItem.component} />
        {/if}
    </Grid>
</div>

{#if editingMode}
    <div
        class="fixed left-0 top-16 bottom-16 w-32 text-white transition-transform duration-300"
        class:-translate-x-full={!leftSidebarExpanded}
    >
        <div
            class="absolute top-1/2 left-full m-1 flex h-10 -translate-y-1/2 cursor-pointer
                select-none items-center rounded-lg bg-slate-500 hover:bg-slate-600"
            on:click={toggleLeftSidebar}
        >
            <span
                class="material-icons -m-1
                    {leftSidebarExpanded ? 'rotate-90' : '-rotate-90'}"
            >
                expand_more
            </span>
        </div>

        <div class="m-2 h-full overflow-auto rounded-lg bg-slate-500">
            {#each Object.entries(ComponentsProps) as [name, proto]}
                <!-- TODO: Get the component icon from somewhere -->
                <ComponentButton
                    {name}
                    on:click={() => {
                        let elem = {
                            x: 0,
                            y: 0,
                            w: 1,
                            h: 1,
                            component: {
                                name,
                                props: JSON.parse(JSON.stringify(proto))
                            },
                            id: crypto.randomUUID()
                        };
                        subComponents.push(elem);
                        mappedComponents.push({
                            [COLS]: gridHelp.item(elem),
                            component: elem.component,
                            id: elem.id
                        });
                    }}
                />
            {/each}
        </div>
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

<script lang="ts" context="module">
    export type InGridComponent = {
        id: string;
        layout: {
            x: number;
            y: number;
            w: number;
            h: number;
            reflowHint: string;
        };
        component: ComponentDescriptor;
    };
</script>

<script lang="ts">
    import DynamicComponent, {
        ComponentDescriptor
    } from "./DynamicComponent.svelte";
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper";
    import NamedComponents, {
        ComponentIcons,
        ComponentsProps,
        NonstandardValue
    } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";
    import Icon from "./Icon.svelte";
    import ComponentButton from "./ComponentButton.svelte";
    import { reflowContent } from "./reflow";

    export let subComponents: InGridComponent[] = [];
    export let editingMode = false;
    let selected: number | undefined;

    let COLS = editingMode
        ? 6
        : window.innerWidth < 320
        ? 1
        : window.innerWidth < 640
        ? 2
        : window.innerWidth < 768
        ? 3
        : window.innerWidth < 960
        ? 4
        : 6;
    let cols = [[1100, COLS]];
    let mappedComponents = (
        COLS === 6 ? subComponents : reflowContent(subComponents, 6, COLS)
    ).map((n) => {
        return {
            id: n.id,
            [COLS]: gridHelp.item({
                ...n.layout,
                fixed: !editingMode
            }),
            component: n.component
        };
    });

    function windowResized() {
        if (!editingMode) {
            const newCOLS =
                window.innerWidth < 320
                    ? 1
                    : window.innerWidth < 640
                    ? 2
                    : window.innerWidth < 768
                    ? 3
                    : window.innerWidth < 960
                    ? 4
                    : 6;
            if (newCOLS !== COLS) {
                COLS = newCOLS;
                cols = [[1100, COLS]];
                mappedComponents = (
                    COLS === 6
                        ? subComponents
                        : reflowContent(subComponents, 6, COLS)
                ).map((n) => {
                    return {
                        id: n.id,
                        [COLS]: gridHelp.item({
                            ...n.layout,
                            fixed: !editingMode
                        }),
                        component: n.component
                    };
                });
            }
        }
    }

    let leftSidebarExpanded = true;
    let rightSidebarExpanded = true;

    function toggleLeftSidebar() {
        leftSidebarExpanded = !leftSidebarExpanded;
    }

    function toggleRightSidebar() {
        rightSidebarExpanded = !rightSidebarExpanded;
    }

    function addComponent(name, proto) {
        let position = {
            x: 0,
            y: 0,
            w: 1,
            h: 1,
            reflowHint: "keep_height"
        };

        const item = {
            [COLS]: gridHelp.item(position),
            component: {
                name,
                props: JSON.parse(JSON.stringify(proto))
            },
            id: crypto.randomUUID()
        };

        const { x, y } = gridHelp.findSpace(item, mappedComponents, COLS);
        item[COLS].x = x;
        item[COLS].y = y;

        mappedComponents.push(item);
        mappedComponents = mappedComponents;
    }

    export function exportGrid() {
        const components = mappedComponents.map((c): InGridComponent => {
            return {
                id: c.id,
                layout: {
                    x: c[COLS].x,
                    y: c[COLS].y,
                    w: c[COLS].w,
                    h: c[COLS].h,
                    reflowHint: c[COLS].reflowHint
                },
                component: c.component
            };
        });
        return components;
    }

    function coerceTypes(a: any) {
        return a as [string, NonstandardValue];
    }
</script>

<svelte:window on:resize={windowResized} />

<div
    class="themed-background themed-text themed-font flex"
    style="min-height: calc( 100vh - 4rem );"
    on:click={() => (selected = undefined)}
>
    <Grid
        bind:items={mappedComponents}
        rowHeight={200}
        {cols}
        let:dataItem
        let:index
    >
        {#if editingMode}
            <div
                on:click={(e) => {
                    selected = index;
                    e.stopPropagation();
                }}
                class={`${
                    selected === index ? "border-red-500" : "border-slate-500"
                } relative h-full w-full rounded-sm border-2 border-solid`}
            >
                <div
                    class="absolute top-2 right-2 z-50 rounded-full bg-slate-400 text-red-500"
                >
                    <Icon
                        on:click={() => {
                            mappedComponents = mappedComponents.filter(
                                (n) => n.component !== dataItem.component
                            );
                            selected = undefined;
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
        class="fixed left-0 top-16 bottom-16 w-32 font-sans text-white transition-transform duration-300"
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

        <div class="m-2 flex h-1/2 flex-col rounded-lg bg-slate-500">
            <div class="border-b border-slate-600 px-2 py-1">Toolbox</div>
            <div class="overflow-y-auto overflow-x-hidden">
                {#each Object.entries(ComponentsProps) as [name, proto]}
                    <ComponentButton
                        {name}
                        icon={ComponentIcons[name]}
                        on:click={() => addComponent(name, proto)}
                    />
                {/each}
            </div>
        </div>

        <div class="m-2 flex h-1/2 flex-col rounded-lg bg-slate-500">
            <div class="border-b border-slate-600 px-2 py-1">Components</div>
            <div class="overflow-y-auto overflow-x-hidden">
                {#each mappedComponents as component, i}
                    <ComponentButton
                        name={component.component.name}
                        icon={ComponentIcons[component.component.name]}
                        selected={selected === i}
                        on:click={() => (selected = i)}
                    />
                {/each}
            </div>
        </div>
    </div>
    <div
        class="fixed right-0 top-16 bottom-16 w-72 font-sans text-white transition-transform duration-300"
        class:translate-x-full={!rightSidebarExpanded}
    >
        <div
            class="absolute top-1/2 right-full m-1 flex h-10 -translate-y-1/2 cursor-pointer
                select-none items-center rounded-lg bg-slate-500 hover:bg-slate-600"
            on:click={toggleRightSidebar}
        >
            <span
                class="material-icons -m-1
                    {rightSidebarExpanded ? '-rotate-90' : 'rotate-90'}"
            >
                expand_more
            </span>
        </div>

        <div
            class="m-2 flex h-full flex-col space-y-1 overflow-auto rounded-lg bg-slate-500"
        >
            <div class="border-b border-slate-600 px-2 py-1">Attributes</div>
            <div class="mt-1 flex items-center space-x-2 px-2">
                <!-- TODO: Get the component icon somehow -->
                <span class="material-icons-outlined md-18">
                    {selected !== undefined
                        ? ComponentIcons[
                              mappedComponents[selected].component.name
                          ]
                        : "disabled_by_default"}
                </span>
                <span
                    >{mappedComponents[selected]?.component?.name ??
                        "No selection"}</span
                >
            </div>
            {#if selected !== undefined}
                <ComplexValueEdit
                    bind:value={mappedComponents[selected]}
                    proto={{ id: "id" }}
                />
                <div class="overflow-auto pb-4">
                    {#if Object.entries(ComponentsProps[mappedComponents[selected].component.name]).filter((n) => !(n[1] instanceof NonstandardValue) || n[1].inline).length > 0}
                        <details open>
                            <summary class="bg-slate-400 px-2">Props</summary>
                            <ComplexValueEdit
                                bind:value={mappedComponents[selected].component
                                    .props}
                                proto={ComponentsProps[
                                    mappedComponents[selected].component.name
                                ]}
                            />
                        </details>
                    {/if}
                    {#each Object.entries(ComponentsProps[mappedComponents[selected].component.name])
                        .filter((n) => n[1] instanceof NonstandardValue && !n[1].inline)
                        .map(coerceTypes) as [name, nonstandard]}
                        <details open>
                            <summary class="bg-slate-400 px-2">
                                {nonstandard.overrideName || name}
                            </summary>
                            {#if nonstandard._type === "textblock"}
                                <div class="p-2">
                                    <textarea
                                        class="w-full text-black"
                                        bind:value={mappedComponents[selected]
                                            .component.props[name]}
                                    />
                                </div>
                            {/if}
                        </details>
                    {/each}
                    <details open>
                        <summary class="bg-slate-400 px-2">Layout</summary>
                        <ComplexValueEdit
                            bind:value={mappedComponents[selected][COLS]}
                            proto={{
                                x: 0,
                                y: 0,
                                w: 0,
                                h: 0,
                                reflowHint: new NonstandardValue(
                                    "reflowhint",
                                    "keep_height",
                                    "Reflow hint",
                                    true
                                )
                            }}
                        />
                    </details>
                </div>
            {/if}
        </div>
    </div>
{/if}

<script lang="ts">
    import DynamicComponent, {
        ComponentDescriptor
    } from "./DynamicComponent.svelte";
    import Grid from "svelte-grid";
    import gridHelp from "svelte-grid/build/helper";
    import NamedComponents, {
        ComponentChildrenType,
        ComponentIcons,
        ComponentsProps
    } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";
    import Icon from "./Icon.svelte";
    import ComponentButton from "./ComponentButton.svelte";

    type InGridComponent = {
        id: string;
        layout: {
            x: number;
            y: number;
            w: number;
            h: number;
        };
        component: ComponentDescriptor;
    };

    export let subComponents: InGridComponent[];
    export let editingMode = true;
    let selected: number | undefined;

    const COLS = 6;
    const cols = [[1100, COLS]];
    let mappedComponents = subComponents.map((n) => {
        return {
            id: n.id,
            [COLS]: gridHelp.item({
                ...n.layout,
                fixed: !editingMode
            }),
            component: n.component
        };
    });

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
            h: 1
        };

        const item = {
            [COLS]: gridHelp.item(position),
            component: {
                name,
                props: JSON.parse(JSON.stringify(proto))
            },
            id: crypto.randomUUID()
        };

        if (ComponentChildrenType[name] === "text") {
            (item.component as ComponentDescriptor).children = [""];
        }

        const { x, y } = gridHelp.findSpace(item, mappedComponents, COLS);
        item[COLS].x = x;
        item[COLS].y = y;

        mappedComponents.push(item);
        mappedComponents = mappedComponents;
    }

    function checkTextComponent(component: ComponentDescriptor) {
        if (ComponentChildrenType[component.name] === "text") {
            if (typeof component.children?.[0] !== "string") {
                component.children = [""];
            }
            return true;
        }
        return false;
    }

    function exportGrid() {
        const components = mappedComponents.map((c): InGridComponent => {
            return {
                id: c.id,
                layout: {
                    x: c[COLS].x,
                    y: c[COLS].y,
                    w: c[COLS].w,
                    h: c[COLS].h
                },
                component: c.component
            };
        });
        console.log(components);
    }
</script>

<div
    class="flex"
    style="height: calc( 100% - 2rem );"
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
                class={`w-full ${
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
        class="fixed right-0 top-16 bottom-16 w-72 text-white transition-transform duration-300"
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
                    {#if Object.keys(ComponentsProps[mappedComponents[selected].component.name]).length > 0}
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
                    {#if checkTextComponent(mappedComponents[selected].component)}
                        <details open>
                            <summary class="bg-slate-400 px-2">Text</summary>
                            <div class="p-2">
                                <textarea
                                    class="w-full text-black"
                                    bind:value={mappedComponents[selected]
                                        .component.children[0]}
                                />
                            </div>
                        </details>
                    {/if}
                    <details open>
                        <summary class="bg-slate-400 px-2">Layout</summary>
                        <ComplexValueEdit
                            bind:value={mappedComponents[selected][COLS]}
                            proto={{
                                x: 0,
                                y: 0,
                                w: 0,
                                h: 0
                            }}
                        />
                    </details>
                </div>
            {/if}
        </div>
    </div>
{/if}

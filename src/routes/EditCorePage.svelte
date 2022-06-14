<script lang="ts">
    import { editCorePage, getCorePage } from "../Server";
    import RootGrid from "../lib/RootGrid.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { push, pop } from "svelte-spa-router";

    let updating = false;

    let initialComponents = [];
    let rootGrid: RootGrid;

    function discardLayout() {
        dispatchEvent(new Event("hideMenubarAcceptors"));
        pop();
    }

    async function acceptLayout() {
        dispatchEvent(new Event("hideMenubarAcceptors"));
        const layout = rootGrid.exportGrid();
        console.log("layout:", layout);

        // save the new layout in case the request fails
        // the user will be able to resume where they left
        initialComponents = layout;

        const component = {
            name: "RootGrid",
            props: {
                subComponents: layout
            }
        };
        updating = true;
        try {
            await editCorePage(params.name, component);
            push("/");
        } catch (err) {
            alert("Failed to edit page: " + err.message);
            updating = false;

            dispatchEvent(
                new CustomEvent("showMenubarAcceptors", {
                    detail: {
                        cancelHandler: discardLayout,
                        acceptHandler: acceptLayout
                    }
                })
            );
        }
    }

    async function loadPage() {
        const component = await getCorePage(params.name);
        if (component.name === "RootGrid") {
            initialComponents = component.props.subComponents;
        } else {
            throw new Error(`Unknown root element type "${component.name}"`);
        }

        dispatchEvent(
            new CustomEvent("showMenubarAcceptors", {
                detail: {
                    cancelHandler: discardLayout,
                    acceptHandler: acceptLayout
                }
            })
        );
    }

    interface CorePageParameters {
        name: string;
    }

    export let params: CorePageParameters;
</script>

{#await loadPage()}
    <div class="p-8">
        <LoadIndicator />
        <p class="text-center text-2xl">Loading page...</p>
    </div>
{:then}
    {#if updating}
        <div class="p-8">
            <LoadIndicator />
            <p class="text-center text-2xl">Editing page...</p>
        </div>
    {:else}
        <RootGrid
            editingMode={true}
            subComponents={initialComponents}
            bind:this={rootGrid}
        />
    {/if}
{:catch err}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load page for editing due to: {err.message}
    </p>
{/await}

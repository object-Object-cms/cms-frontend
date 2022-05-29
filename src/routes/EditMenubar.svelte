<script lang="ts">
    import type { Link } from "../lib/Menubar.svelte";
    import type { ComponentDescriptor } from "../lib/DynamicComponent.svelte";

    import { pop } from "svelte-spa-router";
    import { editCorePage, getCorePage } from "../Server";
    import ComplexValueEdit from "../lib/ComplexValueEdit.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";

    let editObj: { links: Link[] } = { links: [] };
    let saving = false;
    let error = "";

    async function refreshMenubarLinks() {
        editObj.links = (await getCorePage("MENUBAR")) as unknown as Link[];
    }

    async function saveMenubar() {
        if (saving) return;
        error = "";
        saving = true;
        try {
            await editCorePage(
                "MENUBAR",
                editObj.links as unknown as ComponentDescriptor
            );
            pop();
        } catch (err) {
            error = err.message;
        }
        saving = false;
    }
</script>

{#await refreshMenubarLinks()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then}
    {#if error}
        <p class="text-red-600 text-center">Failed to save menubar: {error}</p>
    {/if}
    <div class="py-2">
        <div
            class="max-w-lg mx-auto flex flex-col overflow-auto rounded-lg bg-slate-500 text-white"
        >
            <div class="border-b border-slate-600 px-2 py-1">Menubar</div>
            <div class="overflow-auto">
                <ComplexValueEdit
                    bind:value={editObj}
                    proto={{
                        links: [{ text: "Link text", url: "/" }]
                    }}
                />
            </div>
            <button
                class="button button-blue rounded-none"
                on:click={saveMenubar}
                disabled={saving}
            >
                {#if saving}
                    <LoadIndicator />
                {:else}
                    Save
                {/if}
            </button>
        </div>
    </div>
{:catch err}
    <p class="text-red-600 text-center">
        Failed to load menubar: {err.message}
    </p>
{/await}

<script lang="ts">
    import type { ComponentDescriptor } from "src/lib/DynamicComponent.svelte";
    import { editCorePage, getCorePage } from "../Server";
    import { ThemeDescriptor, themes } from "../lib/themes";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import ThemeSelect from "../lib/ThemeSelect.svelte";
    import CustomThemeEdit from "../lib/CustomThemeEdit.svelte";
    import ThemePreview from "../lib/ThemePreview.svelte";
    import { pop } from "svelte-spa-router";

    let updating = false;
    let error = "";
    let theme;
    let customThemeVariables = {};

    async function saveTheme() {
        if (updating) return;
        updating = true;
        const themeDescriptor: ThemeDescriptor = { name: theme };
        if (theme === "custom")
            themeDescriptor.variables = customThemeVariables;
        try {
            await editCorePage(
                "GLOBAL_THEME",
                themeDescriptor as unknown as ComponentDescriptor
            );
            pop();
        } catch (err) {
            error = err.message;
        }
        updating = false;
    }

    function editTheme(ev: CustomEvent) {
        theme = "custom";
        customThemeVariables = JSON.parse(
            JSON.stringify(themes[ev.detail.id].variables)
        );
    }

    async function loadTheme() {
        const t = (await getCorePage(
            "GLOBAL_THEME"
        )) as unknown as ThemeDescriptor;
        theme = t.name;
        customThemeVariables = t.variables ?? {};
    }
</script>

{#await loadTheme()}
    <div class="p-8">
        <LoadIndicator />
        <p class="text-center text-2xl">Loading theme...</p>
    </div>
{:then}
    {#if updating}
        <div class="p-8">
            <LoadIndicator />
            <p class="text-center text-2xl">Updating theme...</p>
        </div>
    {:else}
        <div class="mx-auto max-w-xl p-4">
            <form
                class="space-y-4 p-4 shadow-md themed-shadow"
                on:submit={saveTheme}
            >
                <h1 class="text-2xl font-bold">Editing global theme</h1>
                {#if error}
                    <p class="text-red-600">Failed to update theme: {error}</p>
                {/if}
                <div class="flex items-end space-x-2">
                    <span
                        class="material-icons-outlined md-36 select-none themed-dim-text"
                    >
                        format_paint
                    </span>
                    <div class="group flex flex-grow flex-col">
                        <span
                            class="text-xs themed-dim-text group-focus-within:themed-accent-primary-text"
                        >
                            Theme
                        </span>
                        <ThemeSelect
                            {themes}
                            bind:selected={theme}
                            on:editTheme={editTheme}
                        />
                    </div>
                </div>

                {#if theme === "custom"}
                    <div class="ml-12 space-y-2">
                        <CustomThemeEdit
                            bind:themeVariables={customThemeVariables}
                        />
                    </div>
                {/if}

                {#if theme}
                    <ThemePreview
                        themeVariables={theme === "custom"
                            ? customThemeVariables
                            : themes[theme]?.variables}
                    />
                {/if}

                <button class="button button-themed-primary" type="submit">
                    Save
                </button>
            </form>
        </div>
    {/if}
{:catch err}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load global theme due to: {err.message}
    </p>
{/await}

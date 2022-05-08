<script lang="ts">
    import { editArticle, getArticle, getArticles } from "../Server";
    import { ThemeComponent, themes } from "../lib/themes";
    import RootGrid from "../lib/RootGrid.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import ThemeSelect from "../lib/ThemeSelect.svelte";
    import CustomThemeEdit from "../lib/CustomThemeEdit.svelte";
    import ThemedComponent from "../lib/ThemedComponent.svelte";
    import { push } from "svelte-spa-router";

    let description = "";
    let theme = "";
    let gatheredMetadata = false;
    let updating = false;
    let error = "";

    let initialComponents = [];
    let rootGrid: RootGrid;
    let customThemeVariables = {};

    function editTheme(ev: CustomEvent) {
        theme = "custom";
        customThemeVariables = JSON.parse(
            JSON.stringify(themes[ev.detail.id].variables)
        );
    }

    function discardLayout() {
        dispatchEvent(new Event("hideMenubarAcceptors"));
        gatheredMetadata = false;
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

        const themeComponent: ThemeComponent = {
            theme: {
                name: theme
            },
            component
        };

        if (theme === "custom")
            themeComponent.theme.variables = customThemeVariables;
        updating = true;
        try {
            await editArticle(params.id, description, themeComponent);
            push("/article/" + params.id);
        } catch (err) {
            error = err.message;
            updating = false;
            gatheredMetadata = false;
        }
    }

    function metadataEntered(ev: SubmitEvent) {
        ev.preventDefault();
        gatheredMetadata = true;
        dispatchEvent(
            new CustomEvent("showMenubarAcceptors", {
                detail: {
                    cancelHandler: discardLayout,
                    acceptHandler: acceptLayout
                }
            })
        );
    }

    async function loadArticle() {
        const [article] = (await getArticles()).filter(
            (a) => a.id === params.id
        );
        if (article) {
            description = article.description;
            const themeComponent = await getArticle(params.id);
            if (themeComponent.component.name === "RootGrid") {
                theme = themeComponent.theme.name;
                if (theme === "custom")
                    customThemeVariables = themeComponent.theme.variables;
                initialComponents =
                    themeComponent.component.props.subComponents;
            } else {
                throw new Error(
                    `Unknown root element type "${themeComponent.component.name}"`
                );
            }
        } else {
            throw new Error("Cannot find the specified article.");
        }
    }

    interface ArticleParameters {
        id: string;
    }

    export let params: ArticleParameters;
</script>

{#await loadArticle()}
    <div class="p-8">
        <LoadIndicator />
        <p class="text-center text-2xl">Loading article...</p>
    </div>
{:then}
    {#if updating}
        <div class="p-8">
            <LoadIndicator />
            <p class="text-center text-2xl">Editing article...</p>
        </div>
    {:else if gatheredMetadata}
        <ThemedComponent
            themeVariables={theme === "custom"
                ? customThemeVariables
                : themes[theme]?.variables}
        >
            <RootGrid
                editingMode={true}
                subComponents={initialComponents}
                bind:this={rootGrid}
            />
        </ThemedComponent>
    {:else}
        <div class="mx-auto max-w-xl p-4">
            <form class="space-y-4 p-4 shadow-md" on:submit={metadataEntered}>
                <h1 class="text-2xl font-bold">Editing article</h1>
                {#if error}
                    <p class="text-red-600">Failed to edit article: {error}</p>
                {/if}
                <div class="flex items-end space-x-2">
                    <span
                        class="material-icons-outlined md-36 select-none text-gray-600"
                    >
                        description
                    </span>
                    <div class="group flex flex-grow flex-col">
                        <span
                            class="text-xs text-gray-600 group-focus-within:text-blue-600"
                        >
                            Description
                        </span>
                        <input
                            class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                            type="text"
                            required
                            minlength="10"
                            bind:value={description}
                        />
                    </div>
                </div>

                <div class="flex items-end space-x-2">
                    <span
                        class="material-icons-outlined md-36 select-none text-gray-600"
                    >
                        format_paint
                    </span>
                    <div class="group flex flex-grow flex-col">
                        <span
                            class="text-xs text-gray-600 group-focus-within:text-blue-600"
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
                    <p
                        class="text-xs text-gray-600 group-focus-within:text-blue-600"
                    >
                        Preview:
                    </p>
                    <ThemedComponent
                        themeVariables={theme === "custom"
                            ? customThemeVariables
                            : themes[theme]?.variables}
                    >
                        <div
                            class="p-4 themed-background themed-font border-gray-600 border-2"
                        >
                            <p class="themed-text">Sample text</p>
                            <p
                                class="themed-link cursor-pointer hover:underline"
                            >
                                This is a link
                            </p>
                        </div>
                    </ThemedComponent>
                {/if}

                <button class="button button-blue" type="submit">Next</button>
            </form>
        </div>
    {/if}
{:catch err}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load article for editing due to: {err.message}
    </p>
{/await}

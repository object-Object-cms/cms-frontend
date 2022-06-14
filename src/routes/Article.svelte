<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import DynamicComponent from "../lib/DynamicComponent.svelte";
    import ThemedComponent from "../lib/ThemedComponent.svelte";
    import { getArticle } from "../Server";
    import { themes } from "../lib/themes";

    interface ArticleParameters {
        id: string;
    }

    export let params: ArticleParameters;
</script>

{#await getArticle(params.id)}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then themeComponent}
    <ThemedComponent
        themeVariables={themeComponent.theme.name === "custom"
            ? themeComponent.theme.variables
            : themes[themeComponent.theme.name].variables}
    >
        <DynamicComponent descriptor={themeComponent.component} />
    </ThemedComponent>
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load article due to: {error}
    </p>
{/await}

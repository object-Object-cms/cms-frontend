<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import DynamicComponent from "../lib/DynamicComponent.svelte";
    import { getArticle } from "../Server";

    interface ArticleParameters {
        id: string;
    }

    export let params: ArticleParameters;
</script>

{#await getArticle(params.id)}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then component}
    <DynamicComponent descriptor={component} />
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load article due to: {error}
    </p>
{/await}

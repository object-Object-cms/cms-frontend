<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import ArticleProperty from "../lib/ArticleProperty.svelte";
    import PageHeader from "../lib/PageHeader.svelte";
    import { link } from "svelte-spa-router";
    import { ArticlePreview, getArticles, getBlobUrl } from "../Server";

    function loadArticleList(): Promise<ArticlePreview[]> {
        return getArticles();
    }

    function formatDate(timestamp: number) {
        const date = new Date(timestamp);
        return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
    }

    function getCategories(articles: ArticlePreview[]): string[] {
        const categories = new Set<string>();
        articles.forEach((a) => categories.add(a.category));
        return [...categories];
    }

    let selectedCategoryFilter;

    function sortDatePublishedDesc(
        a: ArticlePreview,
        b: ArticlePreview
    ): number {
        return b.publishDate - a.publishDate;
    }

    function sortDatePublishedAsc(
        a: ArticlePreview,
        b: ArticlePreview
    ): number {
        return a.publishDate - b.publishDate;
    }

    const sortingModes = [
        { name: "Date published (newest)", func: sortDatePublishedDesc },
        { name: "Date published (oldest)", func: sortDatePublishedAsc }
    ];

    let selectedSortingMode = 0;
    let searchTerm = "";

    export let picker = false;
    export let responseHandler: (id: string) => void = () => {};
</script>

<PageHeader>{picker ? "Pick an article" : "Articles"}</PageHeader>

{#await loadArticleList()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then articles}
    <div
        class="flex flex-col space-y-2 container mx-auto p-4
            sm:space-y-0 sm:flex-row sm:space-x-4"
    >
        <label>
            Filter:
            <select
                class="block h-10 bg-transparent border-2 border-gray-600 focus:border-blue-600 p-2 rounded-full"
                bind:value={selectedCategoryFilter}
            >
                <option value="">--Category--</option>
                {#each getCategories(articles) as category}
                    <option value={category}>{category}</option>
                {/each}
            </select>
        </label>
        <label>
            Sort by:
            <select
                class="block h-10 bg-transparent border-2 border-gray-600 focus:border-blue-600 p-2 rounded-full"
                bind:value={selectedSortingMode}
            >
                {#each sortingModes as mode, i}
                    <option value={i}>{mode.name}</option>
                {/each}
            </select>
        </label>
        <label>
            Search:
            <input
                class="block h-10 outline-none bg-transparent border-2 border-gray-600 focus:border-blue-600 p-2 rounded-full"
                bind:value={searchTerm}
            />
        </label>
    </div>

    {#if articles.length > 0}
        <div class="flex flex-wrap container mx-auto p-4">
            {#each articles
                .filter((a) => !selectedCategoryFilter || a.category === selectedCategoryFilter)
                .filter((a) => !searchTerm || a.title
                            .toLowerCase()
                            .indexOf(searchTerm.toLowerCase()) != -1 || a.description
                            .toLowerCase()
                            .indexOf(searchTerm.toLowerCase()) != -1 || a.category
                            .toLowerCase()
                            .indexOf(searchTerm.toLowerCase()) != -1)
                .sort(sortingModes[selectedSortingMode].func) as article}
                <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
                    <div class="border-2 rounded-lg overflow-hidden">
                        <div
                            class="h-24 bg-cover bg-center"
                            style="background-image: url({getBlobUrl(
                                article.bannerImage
                            )});"
                        />
                        <div class="p-2">
                            <ArticleProperty icon="person">
                                {article.author}
                            </ArticleProperty>
                            <ArticleProperty icon="category">
                                {article.category}
                            </ArticleProperty>
                            <ArticleProperty icon="access_time">
                                {formatDate(article.publishDate)}
                            </ArticleProperty>
                            <h2 class="text-xl">{article.title}</h2>
                            <p>{article.description}</p>
                            {#if picker}
                                <button
                                    class="button button-big button-blue mt-2"
                                    on:click={() => responseHandler(article.id)}
                                >
                                    Choose
                                </button>
                            {:else}
                                <a
                                    class="button button-big button-blue mt-2"
                                    use:link
                                    href="/article/{article.id}"
                                >
                                    Read More
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <p class="text-center">No articles yet.</p>
    {/if}
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load article list due to: {error}
    </p>
{/await}

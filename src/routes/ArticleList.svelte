<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import ArticleProperty from "../lib/ArticleProperty.svelte";
    import PageHeader from "../lib/PageHeader.svelte";
    import { link } from "svelte-spa-router";

    interface ArticlePreview {
        id: string;
        title: string;
        description: string;
        bannerImage: string;
        category: string;
        publishDate: number;
    }

    function loadArticleList(): Promise<ArticlePreview[]> {
        return fetch("dummydata/articles.json").then((resp) => resp.json());
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
</script>

{#await loadArticleList()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then articles}
    <PageHeader>Articles</PageHeader>

    <div
        class="flex flex-col space-y-2 container mx-auto p-4
            sm:space-y-0 sm:flex-row sm:space-x-4"
    >
        <label>
            Filter:
            <select
                class="block bg-transparent border-2 border-gray-600 focus:border-blue-600 p-2 rounded-full"
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
                class="block bg-transparent border-2 border-gray-600 focus:border-blue-600 p-2 rounded-full"
                bind:value={selectedSortingMode}
            >
                {#each sortingModes as mode, i}
                    <option value={i}>{mode.name}</option>
                {/each}
            </select>
        </label>
    </div>

    <div class="flex flex-wrap container mx-auto p-4">
        {#each articles
            .filter((a) => !selectedCategoryFilter || a.category === selectedCategoryFilter)
            .sort(sortingModes[selectedSortingMode].func) as article}
            <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
                <div class="border-2 rounded-lg overflow-hidden">
                    <div
                        class="h-24 bg-cover bg-center"
                        style="background-image: url({article.bannerImage});"
                    />
                    <div class="p-2">
                        <ArticleProperty icon="category">
                            {article.category}
                        </ArticleProperty>
                        <ArticleProperty icon="access_time">
                            {formatDate(article.publishDate)}
                        </ArticleProperty>
                        <h2 class="text-xl">{article.title}</h2>
                        <p>{article.description}</p>
                        <a
                            class="button button-big button-blue mt-2"
                            use:link
                            href="/article/{article.id}"
                        >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/await}

<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
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
</script>

{#await loadArticleList()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then articles}
    <div class="bg-gray-300 p-4 pt-32">
        <div class="container mx-auto">
            <h1 class="text-4xl font-bold">Articles</h1>
        </div>
    </div>

    <div class="flex flex-wrap container mx-auto p-4">
        {#each articles as article}
            <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
                <div class="border-2 rounded-lg overflow-hidden">
                    <div
                        class="h-24 bg-cover bg-center"
                        style="background-image: url({article.bannerImage});"
                    />
                    <div class="p-2">
                        <p
                            class="text-gray-500 flex items-center text-sm space-x-1"
                        >
                            <span class="material-icons md-18">access_time</span
                            >
                            <span>{formatDate(article.publishDate)}</span>
                        </p>
                        <h2 class="text-xl">{article.title}</h2>
                        <p>{article.description}</p>
                        <a
                            class="button button-big button-blue mt-2"
                            use:link
                            href="/article/{article.id}">Read More</a
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
{/await}

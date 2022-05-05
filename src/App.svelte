<script lang="ts">
    import Router from "svelte-spa-router";
    import { fade } from "svelte/transition";

    import LoadIndicator from "./lib/LoadIndicator.svelte";
    import Menubar, { Link } from "./lib/Menubar.svelte";

    import Home from "./routes/Home.svelte";
    import Article from "./routes/Article.svelte";
    import ArticleList from "./routes/ArticleList.svelte";

    import "./App.css";

    let menubarLinks: Link[] = [];
    let initialLinksLoadComplete = false;

    function refreshMenubarLinks() {
        return fetch("dummydata/menubar.json")
            .then((resp) => resp.json())
            .then((links) => {
                menubarLinks = links;
            });
    }

    refreshMenubarLinks().then(() => (initialLinksLoadComplete = true));

    function routeLoading() {
        refreshMenubarLinks();
    }
</script>

{#if !initialLinksLoadComplete}
    <div class="fixed left-0 top-0 right-0 bottom-0 z-50 bg-white" out:fade>
        <LoadIndicator />
    </div>
{/if}

<Menubar links={menubarLinks} />

<main>
    <Router
        routes={{
            "/": Home,
            "/article/:id": Article,
            "/article": ArticleList
        }}
        on:routeLoading={routeLoading}
    />
</main>

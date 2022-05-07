<script lang="ts">
    import Router, { replace } from "svelte-spa-router";
    import { wrap } from "svelte-spa-router/wrap";
    import { fade } from "svelte/transition";

    import LoadIndicator from "./lib/LoadIndicator.svelte";
    import Menubar, { Link } from "./lib/Menubar.svelte";
    import ModalContainer from "./lib/modals/ModalContainer.svelte";
    import { refreshAccountInfo, currentAccount } from "./AccountManager";

    import Home from "./routes/Home.svelte";

    import Article from "./routes/Article.svelte";
    import ArticleList from "./routes/ArticleList.svelte";
    import Gallery from "./routes/Gallery.svelte";
    import Comments from "./routes/Comments.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import Profile from "./routes/Profile.svelte";
    import NotFound from "./routes/NotFound.svelte";

    import "./App.css";

    let menubarLinks: Link[] = [];
    let startupFinished = false;

    function refreshMenubarLinks() {
        return fetch("dummydata/menubar.json")
            .then((resp) => resp.json())
            .then((links) => {
                menubarLinks = links;
            })
            .catch((reason) => {
                console.error("Failed to refresh menubar links:", reason);
            });
    }

    function routeLoading() {
        if (startupFinished) {
            refreshMenubarLinks();
            if ($currentAccount !== null) {
                refreshAccountInfo();
            }
        }
    }

    function conditionsFailed() {
        replace("/");
    }

    async function runStartupTasks() {
        await Promise.all([refreshMenubarLinks(), refreshAccountInfo()]);
        startupFinished = true;
    }
</script>

{#await runStartupTasks()}
    <div class="fixed left-0 top-0 right-0 bottom-0 z-50 bg-white" out:fade>
        <LoadIndicator />
    </div>
{/await}

<Menubar links={menubarLinks} />

<main>
    <Router
        routes={{
            "/": Home,
            "/article/:id": Article,
            "/article": ArticleList,
            "/gallery": Gallery,
            "/comments": Comments,
            "/login": Login,
            "/register": Register,
            "/profile": wrap({
                component: Profile,
                conditions: [
                    () => {
                        return $currentAccount !== null;
                    }
                ]
            }),
            "*": NotFound
        }}
        on:routeLoading={routeLoading}
        on:conditionsFailed={conditionsFailed}
    />
</main>

<ModalContainer />

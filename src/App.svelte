<script lang="ts">
    import Router, { replace } from "svelte-spa-router";
    import { wrap } from "svelte-spa-router/wrap";
    import { fade } from "svelte/transition";

    import LoadIndicator from "./lib/LoadIndicator.svelte";
    import Menubar, { Link } from "./lib/Menubar.svelte";
    import ModalContainer from "./lib/modals/ModalContainer.svelte";
    import ThemedComponent from "./lib/ThemedComponent.svelte";
    import { refreshAccountInfo, currentAccount } from "./AccountManager";
    import { getCorePage } from "./Server";
    import { ThemeDescriptor, themes } from "./lib/themes";

    import Home from "./routes/Home.svelte";
    import Article from "./routes/Article.svelte";
    import ArticleList from "./routes/ArticleList.svelte";
    import Gallery from "./routes/Gallery.svelte";
    import Comments from "./routes/Comments.svelte";
    import Login from "./routes/Login.svelte";
    import Register from "./routes/Register.svelte";
    import Profile from "./routes/Profile.svelte";
    import NewArticle from "./routes/NewArticle.svelte";
    import EditArticle from "./routes/EditArticle.svelte";
    import EditCorePage from "./routes/EditCorePage.svelte";
    import EditMenubar from "./routes/EditMenubar.svelte";
    import ManageUsers from "./routes/ManageUsers.svelte";
    import ManageGallery from "./routes/ManageGallery.svelte";
    import NotFound from "./routes/NotFound.svelte";

    import "./App.css";

    let menubarLinks: Link[] = [];
    let startupFinished = false;
    let globalTheme: ThemeDescriptor = { name: "standard" };

    function refreshMenubarLinks() {
        return getCorePage("MENUBAR")
            .then((links) => {
                menubarLinks = links as unknown as Link[];
            })
            .catch((reason) => {
                console.error("Failed to refresh menubar links:", reason);
            });
    }

    function refreshGlobalTheme() {
        return getCorePage("GLOBAL_THEME")
            .then((theme) => {
                // it just so happens that ComponentDescriptor has a name property
                // so no need for casts
                globalTheme = theme;
            })
            .catch((reason) => {
                console.error("Failed to refresh global theme:", reason);
            });
    }

    function routeLoading() {
        if (startupFinished) {
            refreshMenubarLinks();
            refreshGlobalTheme();
            if ($currentAccount !== null) {
                refreshAccountInfo();
            }
        }
        dispatchEvent(new Event("hideMenubarAcceptors"));
    }

    function conditionsFailed() {
        replace("/");
    }

    async function runStartupTasks() {
        await Promise.all([
            refreshMenubarLinks(),
            refreshGlobalTheme(),
            refreshAccountInfo()
        ]);
        startupFinished = true;
    }

    setInterval(() => {
        if ($currentAccount !== null) {
            refreshAccountInfo();
        }
    }, 30000);
</script>

{#await runStartupTasks()}
    <div class="fixed left-0 top-0 right-0 bottom-0 z-50 bg-white" out:fade>
        <LoadIndicator />
    </div>
{/await}

<ThemedComponent
    themeVariables={globalTheme.name === "custom"
        ? globalTheme.variables
        : themes[globalTheme.name].variables}
>
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
                "/newArticle": NewArticle,
                "/editArticle/:id": EditArticle,
                "/editCore/:name": EditCorePage,
                "/editMenubar": EditMenubar,
                "/manageUsers": ManageUsers,
                "/manageGallery": ManageGallery,
                "*": NotFound
            }}
            on:routeLoading={routeLoading}
            on:conditionsFailed={conditionsFailed}
        />
    </main>

    <ModalContainer />
</ThemedComponent>

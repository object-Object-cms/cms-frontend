<script lang="ts">
    import Router from "svelte-spa-router";
    import Menubar from "./lib/Menubar.svelte";

    import Home from "./routes/Home.svelte";

    import "./App.css";
</script>

<Menubar
    links={[
        { text: "Articles", url: "/articles" },
        { text: "Gallery", url: "/gallery" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" },
        { text: "Comments", url: "/comments" }
    ]}
/>

<main>
    <Router
        routes={{
            "/": Home
        }}
    />
</main>

<script lang="ts">
    import { link } from "svelte-spa-router";

    export let links: { text: string; url: string }[];
    export let copyrightText: string;
</script>

<div class="themed-divide divide-y">
    <div class="themed-dim-text flex flex-wrap justify-center gap-2">
        {#each links as linkObj}
            {#if linkObj.url.startsWith("/")}
                <a class="hover:underline" href={linkObj.url} use:link
                    >{linkObj.text}</a
                >
            {:else}
                <a class="hover:underline" href={linkObj.url}>{linkObj.text}</a>
            {/if}
        {/each}
    </div>
    <p class="themed-text text-center">{copyrightText}</p>
</div>

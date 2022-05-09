<script lang="ts">
    import { link } from "svelte-spa-router";

    export let title: string;
    export let description: string;
    export let linkUrl: string;
    export let linkText: string;
</script>

<div
    class="themed-font themed-text flex h-full flex-col overflow-hidden rounded border border-gray-600"
>
    <div class="bg-gray-400 bg-opacity-50 p-2">News</div>
    <div class="flex flex-grow flex-col items-start p-2">
        <p class="text-2xl">{title}</p>
        <p>{description}</p>
        {#if linkUrl.startsWith("/")}
            <a class="button button-blue mt-auto" href={linkUrl} use:link
                >{linkText}</a
            >
        {:else}
            <a class="button button-blue mt-auto" href={linkUrl}>{linkText}</a>
        {/if}
    </div>
</div>

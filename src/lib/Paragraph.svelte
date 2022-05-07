<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    export let textContent = "";
</script>

<div class="markdown">
    <SvelteMarkdown source={textContent} />
</div>

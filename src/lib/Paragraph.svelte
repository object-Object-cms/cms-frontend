<script lang="ts">
    import SvelteMarkdown from "svelte-markdown";

    export let textContent = "";
</script>

<div class="markdown h-full overflow-hidden">
    <SvelteMarkdown source={textContent} />
</div>

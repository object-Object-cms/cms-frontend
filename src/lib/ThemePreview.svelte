<script lang="ts">
    import type { ThemeVariables } from "./themes";
    import ThemedComponent from "./ThemedComponent.svelte";
    import NewsBox from "./NewsBox.svelte";
    import Paragraph from "./Paragraph.svelte";

    export let themeVariables: Partial<ThemeVariables>;

    const markdownPreviewSource = `# Sample text

This is an example text component, styled with **Mark***down*

[A link to nowhere](javascript:void(0))`;
</script>

<p
    class="themed-dim-text group-focus-within:themed-accent-primary-text text-xs"
>
    Preview:
</p>
<ThemedComponent {themeVariables}>
    <div
        class="themed-background themed-text themed-font themed-box-border border-2 p-4"
    >
        <Paragraph textContent={markdownPreviewSource} />
        <NewsBox
            title="Example"
            description="This is an example of a box and a button"
            linkText="Click me"
            linkUrl="javascript:void(0)"
        />
    </div>
</ThemedComponent>

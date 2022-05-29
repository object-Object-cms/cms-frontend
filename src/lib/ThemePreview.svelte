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

<p class="text-xs text-gray-600 group-focus-within:text-blue-600">Preview:</p>
<ThemedComponent {themeVariables}>
    <div
        class="themed-background themed-text themed-font border-2 border-gray-600 p-4"
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

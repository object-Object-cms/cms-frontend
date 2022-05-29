<script lang="ts">
    import type { ThemeVariables } from "./themes";
    import ThemedComponent from "./ThemedComponent.svelte";

    export let themeVariables: Partial<ThemeVariables>;
</script>

<p class="text-xs text-gray-600 group-focus-within:text-blue-600">Preview:</p>
<ThemedComponent {themeVariables}>
    <div class="themed-background themed-font border-2 border-gray-600 p-4">
        <p class="themed-text">Sample text</p>
        <p class="themed-link cursor-pointer hover:underline">This is a link</p>
    </div>
</ThemedComponent>

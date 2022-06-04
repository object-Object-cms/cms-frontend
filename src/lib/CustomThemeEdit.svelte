<script lang="ts">
    import type { ThemeVariables } from "./themes";
    import MaterialColorIconInput from "./MaterialColorIconInput.svelte";
    import MaterialInputHeader from "./MaterialInputHeader.svelte";

    export let themeVariables: Partial<ThemeVariables>;
</script>

<MaterialInputHeader>Main</MaterialInputHeader>
<MaterialColorIconInput
    icon="wallpaper"
    label="Background color"
    bind:value={themeVariables.backgroundColor}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Text color"
    bind:value={themeVariables.textColor}
/>
<MaterialColorIconInput
    icon="link"
    label="Link color"
    bind:value={themeVariables.linkColor}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Dim text color"
    bind:value={themeVariables.dimTextColor}
/>
<MaterialColorIconInput
    icon="grid_3x3"
    label="Divisor color"
    bind:value={themeVariables.divisorColor}
/>
<MaterialColorIconInput
    icon="lens_blur"
    label="Shadow color"
    bind:value={themeVariables.shadowColor}
/>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 themed-dim-text select-none">
        text_fields
    </span>
    <div class="group flex flex-grow flex-col">
        <span
            class="themed-dimtext group-focus-within:themed-accent-primary-text text-xs"
        >
            Font style
        </span>
        <select
            class="themed-box-primary"
            bind:value={themeVariables.fontFamily}
        >
            <option value="sans-serif">Sans serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="fantasy">Fantasy</option>
            <option value="blank">Blank</option>
        </select>
    </div>
</div>

<MaterialInputHeader>Boxes</MaterialInputHeader>
<MaterialColorIconInput
    icon="wallpaper"
    label="Primary box background color"
    bind:value={themeVariables.boxBackgroundColorPrimary}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Primary box text color"
    bind:value={themeVariables.boxTextColorPrimary}
/>
<MaterialColorIconInput
    icon="wallpaper"
    label="Secondary box background color"
    bind:value={themeVariables.boxBackgroundColorSecondary}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Secondary box text color"
    bind:value={themeVariables.boxTextColorSecondary}
/>
<MaterialColorIconInput
    icon="border_color"
    label="Box border color"
    bind:value={themeVariables.boxBorderColor}
/>

<MaterialInputHeader>Accents</MaterialInputHeader>
<MaterialColorIconInput
    icon="format_color_fill"
    label="Primary accent color"
    bind:value={themeVariables.accentColorPrimary}
/>
<MaterialColorIconInput
    icon="ads_click"
    label="Primary accent hover color"
    bind:value={themeVariables.accentHoverPrimary}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Primary accent text color"
    bind:value={themeVariables.accentTextPrimary}
/>
<MaterialColorIconInput
    icon="format_color_fill"
    label="Secondary accent color"
    bind:value={themeVariables.accentColorSecondary}
/>
<MaterialColorIconInput
    icon="ads_click"
    label="Secondary accent hover color"
    bind:value={themeVariables.accentHoverSecondary}
/>
<MaterialColorIconInput
    icon="format_color_text"
    label="Secondary accent text color"
    bind:value={themeVariables.accentTextSecondary}
/>

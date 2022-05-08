<script lang="ts">
    import type { ThemeVariables } from "./themes";

    export let themeVariables: Partial<ThemeVariables>;

    function genStyle(vars: Partial<ThemeVariables>) {
        let style = "";
        if (vars.backgroundColor) {
            style += `--theme-background-color:${vars.backgroundColor};`;
        }
        if (vars.textColor) {
            style += `--theme-text-color:${vars.textColor};`;
        }
        if (vars.linkColor) {
            style += `--theme-link-color:${vars.linkColor};`;
        }
        if (vars.fontFamily) {
            switch (vars.fontFamily) {
                case "sans-serif":
                    style += `--theme-font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica Neue",Arial,Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";`;
                    break;
                case "serif":
                    style += `--theme-font-family:ui-serif,Georgia,Cambria,"Times New Roman",Times,serif;`;
                    break;
                case "monospace":
                    style += `--theme-font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;`;
                    break;
                default:
                    style += `--theme-font-family:${vars.fontFamily};`;
            }
        }
        return style;
    }
</script>

<span class="contents" style={genStyle(themeVariables)}>
    <slot />
</span>

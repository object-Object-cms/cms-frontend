<script lang="ts">
    import type { ThemeVariables } from "./themes";

    export let themeVariables: Partial<ThemeVariables>;

    function genStyle(vars: Partial<ThemeVariables>) {
        let style = "";

        function appendStyle(value: any, name: string) {
            if (value) {
                style += `--theme-${name}:${value};`;
            }
        }

        appendStyle(vars.backgroundColor, "background-color");
        appendStyle(vars.textColor, "text-color");
        appendStyle(vars.linkColor, "link-color");
        appendStyle(vars.dimTextColor, "dim-text-color");
        appendStyle(vars.divisorColor, "divisor-color");
        if (vars.shadowColor) {
            appendStyle(vars.shadowColor + "20", "shadow-color");
        }
        appendStyle(
            vars.boxBackgroundColorPrimary,
            "box-background-color-primary"
        );
        appendStyle(vars.boxTextColorPrimary, "box-text-color-primary");
        appendStyle(
            vars.boxBackgroundColorSecondary,
            "box-background-color-secondary"
        );
        appendStyle(vars.boxTextColorSecondary, "box-text-color-secondary");
        appendStyle(vars.boxBorderColor, "box-border-color");
        appendStyle(vars.accentColorPrimary, "accent-color-primary");
        appendStyle(vars.accentHoverPrimary, "accent-hover-primary");
        appendStyle(vars.accentTextPrimary, "accent-text-primary");
        appendStyle(vars.accentColorSecondary, "accent-color-secondary");
        appendStyle(vars.accentHoverSecondary, "accent-hover-secondary");
        appendStyle(vars.accentTextSecondary, "accent-text-secondary");

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

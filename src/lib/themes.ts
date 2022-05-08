import type { ComponentDescriptor } from "./DynamicComponent.svelte";

interface ThemePreview {
    icon: string;
}

export interface ThemeVariables {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    fontFamily: string;
}

export interface Theme {
    name: string;
    preview: ThemePreview;
    variables: ThemeVariables;
}

export interface ThemeComponent {
    theme: {
        name: string;
        variables?: Partial<ThemeVariables>;
    };
    component: ComponentDescriptor;
}

export type Themes = {
    [key: string]: Theme;
};

export const themes: Themes = {
    standard: {
        name: "Standard",
        preview: {
            icon: "texture"
        },
        variables: {
            backgroundColor: "#ffffff",
            textColor: "#000000",
            linkColor: "#2563eb",
            fontFamily: "sans-serif"
        }
    },
    hotTomato: {
        name: "Hot tomato",
        preview: {
            icon: "outdoor_grill"
        },
        variables: {
            backgroundColor: "#ffff00",
            textColor: "#ff0000",
            linkColor: "#ff9900",
            fontFamily: "cursive"
        }
    }
};

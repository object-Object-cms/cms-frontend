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

export const themeComponentTemplates: {
    [key: keyof Themes]: () => any[];
} = {
    standard() {
        return [
            {
                id: crypto.randomUUID(),
                layout: {
                    x: 0,
                    y: 0,
                    w: 6,
                    h: 2
                },
                component: {
                    name: "Paragraph",
                    props: {
                        textContent: `# Standard theme
This is a template of the standard theme.

Comes with black text on white background and blue links.

Suitable for everything.

The paragraph supports *Mark***down** styling.`
                    }
                }
            }
        ];
    },
    hotTomato() {
        return [
            {
                id: crypto.randomUUID(),
                layout: {
                    x: 0,
                    y: 0,
                    w: 6,
                    h: 2
                },
                component: {
                    name: "Paragraph",
                    props: {
                        textContent: `# Hot tomato theme
A spicy template for your most spicy topics.`
                    }
                }
            }
        ];
    }
};

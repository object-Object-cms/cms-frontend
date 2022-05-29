import type { ComponentDescriptor } from "./DynamicComponent.svelte";

interface ThemePreview {
    icon: string;
}

export interface ThemeVariables {
    backgroundColor: string;
    textColor: string;
    linkColor: string;
    dimTextColor: string;
    divisorColor: string;
    boxBackgroundColorPrimary: string;
    boxTextColorPrimary: string;
    boxBackgroundColorSecondary: string;
    boxTextColorSecondary: string;
    boxBorderColor: string;
    buttonColorPrimary: string;
    buttonHoverPrimary: string;
    buttonTextPrimary: string;
    fontFamily: string;
}

export interface Theme {
    name: string;
    preview: ThemePreview;
    variables: ThemeVariables;
}

export interface ThemeDescriptor {
    name: string;
    variables?: Partial<ThemeVariables>;
}

export interface ThemeComponent {
    theme: ThemeDescriptor;
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
            dimTextColor: "#6b7280",
            divisorColor: "#d1d5db",
            boxBackgroundColorPrimary: "#f3f4f6",
            boxTextColorPrimary: "#000000",
            boxBackgroundColorSecondary: "#d1d5db",
            boxTextColorSecondary: "#000000",
            boxBorderColor: "#9ca3af",
            buttonColorPrimary: "#2563eb",
            buttonHoverPrimary: "#3b82f6",
            buttonTextPrimary: "#ffffff",
            fontFamily: "sans-serif"
        }
    },
    dark: {
        name: "Dark mode",
        preview: {
            icon: "dark_mode"
        },
        variables: {
            backgroundColor: "#111827",
            textColor: "#ffffff",
            linkColor: "#60a5fa",
            dimTextColor: "#9ca3af",
            divisorColor: "#4b5563",
            boxBackgroundColorPrimary: "#1f2937",
            boxTextColorPrimary: "#ffffff",
            boxBackgroundColorSecondary: "#374151",
            boxTextColorSecondary: "#ffffff",
            boxBorderColor: "#4b5563",
            buttonColorPrimary: "#3b82f6",
            buttonHoverPrimary: "#60a5fa",
            buttonTextPrimary: "#ffffff",
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
            linkColor: "#ea580c",
            dimTextColor: "#ef4444",
            divisorColor: "#f87171",
            boxBackgroundColorPrimary: "#fde047",
            boxTextColorPrimary: "#78350f",
            boxBackgroundColorSecondary: "#facc15",
            boxTextColorSecondary: "#7c2d12",
            boxBorderColor: "#eab308",
            buttonColorPrimary: "#ea580c",
            buttonHoverPrimary: "#f97316",
            buttonTextPrimary: "#ffffff",
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
    dark() {
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
                        textContent: `# Dark theme
When the standard theme is too bright dark theme has got you covered.`
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

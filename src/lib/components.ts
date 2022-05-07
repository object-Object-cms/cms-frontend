import Icon from "./Icon.svelte";
import Slider from "./Slider.svelte";
import RootGrid from "./RootGrid.svelte";
import Paragraph from "./Paragraph.svelte";

const NamedComponents: { [key: string]: any } = {
    Icon,
    Slider,
    RootGrid,
    Paragraph
};

export type SimpleValue = string | number | boolean | string[] /* Combo box */;
export type ComplexValue = {
    [key: string]: SimpleValue | ComplexValue | ComplexValue[];
};

export const ComponentsProps: {
    [key: keyof typeof NamedComponents]: null | ComplexValue;
} = {
    Slider: {
        slides: [
            {
                title: "Title",
                description: "Description",
                image: "0",
                textColor: ["white", "black"]
            }
        ],
        cycleTime: 3000
    },
    Paragraph: {}
};

export const ComponentIcons: {
    [key: keyof typeof NamedComponents]: string;
} = {
    Slider: "view_carousel",
    Paragraph: "view_headline"
};

export default NamedComponents;

import Icon from "./Icon.svelte";
import Slider from "./Slider.svelte";
import RootGrid from "./RootGrid.svelte";
import Paragraph from "./Paragraph.svelte";
import Image from "./Image.svelte";

const NamedComponents: { [key: string]: any } = {
    Icon,
    Slider,
    RootGrid,
    Paragraph,
    Image
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
    Paragraph: {},
    Image: {
        image: "0",
        alt: "Alternative text"
    }
};

export const ComponentIcons: {
    [key: keyof typeof NamedComponents]: string;
} = {
    Slider: "view_carousel",
    Paragraph: "view_headline",
    Image: "image"
};

export const ComponentChildrenType: {
    [key: keyof typeof NamedComponents]: string;
} = {
    Paragraph: "text"
};

export default NamedComponents;

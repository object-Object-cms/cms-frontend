import Icon from "./Icon.svelte";
import Slider from "./Slider.svelte";
import RootGrid from "./RootGrid.svelte";
import Image from "./Image.svelte";
import Paragraph from "./Paragraph.svelte";

const NamedComponents: { [key: string]: any } = {
    Icon,
    Slider,
    RootGrid,
    Image,
    Paragraph
};

export type SimpleValue = string | number | boolean | string[] /* Combo box */;
export type ComplexValue = {
    [key: string]:
        | SimpleValue
        | ComplexValue
        | ComplexValue[]
        | NonstandardValue;
};

export type NonstandardType = "image" | "textblock";
export class NonstandardValue {
    constructor(
        public _type: NonstandardType,
        public underlying: SimpleValue,
        public overrideName: string | null = null
    ) {}

    public toJSON() {
        return this.underlying;
    }
}

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
    Image: {
        image: "0",
        alt: "Alternative text"
    },
    Paragraph: {
        textContent: new NonstandardValue(
            "textblock",
            "Content",
            "Paragraph Content"
        )
    }
};

export const ComponentIcons: {
    [key: keyof typeof NamedComponents]: string;
} = {
    Slider: "view_carousel",
    Image: "image",
    Paragraph: "view_headline"
};

export default NamedComponents;

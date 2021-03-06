import Icon from "./Icon.svelte";
import Slider from "./Slider.svelte";
import RootGrid from "./RootGrid.svelte";
import Image from "./Image.svelte";
import Paragraph from "./Paragraph.svelte";
import NewsBox from "./NewsBox.svelte";
import Footer from "./Footer.svelte";

const NamedComponents: { [key: string]: any } = {
    Icon,
    Slider,
    RootGrid,
    Image,
    Paragraph,
    NewsBox,
    Footer
};

export type SimpleValue = string | number | boolean | string[] /* Combo box */;
export type ComplexValue = {
    [key: string]:
        | SimpleValue
        | ComplexValue
        | ComplexValue[]
        | NonstandardValue;
};

export type NonstandardType = "image" | "textblock" | "reflowhint";
export class NonstandardValue {
    constructor(
        public _type: NonstandardType,
        public underlying: SimpleValue,
        public overrideName: string | null = null,
        public inline: boolean = false
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
                image: new NonstandardValue("image", "0", "Image", true),
                textColor: ["white", "black"]
            }
        ],
        cycleTime: 3000
    },
    Image: {
        image: new NonstandardValue("image", "0", "Image", true),
        alt: "Alternative text"
    },
    Paragraph: {
        textContent: new NonstandardValue(
            "textblock",
            "Content",
            "Markdown Text"
        )
    },
    NewsBox: {
        title: "Title",
        description: "Description",
        linkUrl: "/",
        linkText: "Go somewhere"
    },
    Footer: {
        links: [
            {
                text: "Link",
                url: "/"
            }
        ],
        copyrightText: "Copyright 2022"
    }
};

export const ComponentIcons: {
    [key: keyof typeof NamedComponents]: string;
} = {
    Slider: "view_carousel",
    Image: "image",
    Paragraph: "view_headline",
    NewsBox: "feed",
    Footer: "short_text"
};

export default NamedComponents;

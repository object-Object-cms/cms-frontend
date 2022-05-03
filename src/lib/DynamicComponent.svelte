<script lang="ts">
    import DynamicComponents from "./DynamicComponents.svelte";
    import Icon from "./Icon.svelte";
    import Slider from "./Slider.svelte";

    interface ComponentDescriptor {
        name: string;
        props: any;
        children: ComponentDescriptor[];
    }

    export let descriptor: ComponentDescriptor;

    const namedComponents = {
        Icon,
        Slider
    };
</script>

<svelte:component this={namedComponents[descriptor.name]} {...descriptor.props}>
    <DynamicComponents components={descriptor.children} />
</svelte:component>

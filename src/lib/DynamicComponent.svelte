<script lang="ts" context="module">
    export interface ComponentDescriptor {
        name: string;
        props: { [key: string]: any };
        children?: ComponentDescriptor[];
    }
</script>

<script lang="ts">
    import NamedComponents from "./components";
    import DynamicComponents from "./DynamicComponents.svelte";

    export let descriptor: ComponentDescriptor;
</script>

<svelte:component this={NamedComponents[descriptor.name]} {...descriptor.props}>
    <DynamicComponents components={descriptor.children} />
</svelte:component>

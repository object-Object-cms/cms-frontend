<script lang="ts" context="module">
    export interface ComponentDescriptor {
        name: string;
        props: { [key: string]: any };
        children?: (ComponentDescriptor | string)[];
    }
</script>

<script lang="ts">
    import NamedComponents from "./components";
    import DynamicComponents from "./DynamicComponents.svelte";

    export let descriptor: ComponentDescriptor;
</script>

{#if descriptor.children}
    <svelte:component
        this={NamedComponents[descriptor.name]}
        {...descriptor.props}
    >
        <DynamicComponents components={descriptor.children} />
    </svelte:component>
{:else}
    <svelte:component
        this={NamedComponents[descriptor.name]}
        {...descriptor.props}
    />
{/if}

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { Themes } from "./themes";

    const dispatch = createEventDispatcher();

    export let themes: Themes;
    export let selected: string;
</script>

<div class="mt-1 flex justify-center gap-4">
    {#each Object.entries(themes) as [id, theme]}
        <div
            class="flex cursor-pointer select-none flex-col items-center space-y-2 rounded border-2
                px-2 py-4 text-gray-600 hover:bg-black hover:bg-opacity-10
                {selected === id ? 'border-blue-600' : 'border-gray-600'}"
            on:click={() => (selected = id)}
        >
            <span class="material-icons md-36">{theme.preview.icon}</span>
            <span class="text-sm">{theme.name}</span>
            <div
                class="icon h-7 w-7 p-1"
                on:click={(ev) => {
                    ev.stopPropagation();
                    dispatch("editTheme", { id });
                }}
            >
                <span class="material-icons md-18 m-px">edit</span>
            </div>
        </div>
    {/each}
    <div
        class="flex cursor-pointer select-none flex-col items-center space-y-2 rounded border-2
            px-2 py-4 text-gray-600 hover:bg-black hover:bg-opacity-10
            {selected === 'custom' ? 'border-blue-600' : 'border-gray-600'}"
        on:click={() => (selected = "custom")}
    >
        <span class="material-icons md-36">wb_incandescent</span>
        <span class="text-sm">Custom</span>
    </div>
</div>

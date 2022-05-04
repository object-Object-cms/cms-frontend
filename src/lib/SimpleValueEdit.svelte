<script lang="ts">
    export let name: string;
    export let value: any;
    export let type: "text" | "number" | "checkbox" | "dropdown";
</script>

<div class="w-1/3 overflow-hidden pl-2 hover:overflow-visible">
    <div class="relative z-50 w-max hover:bg-slate-500">
        {name}
    </div>
</div>
<div class="w-2/3">
    {#if type === "text"}
        <input
            class="w-full bg-transparent outline-none"
            type="text"
            bind:value
        />
    {:else if type === "number"}
        <input
            class="w-full bg-transparent outline-none"
            type="number"
            bind:value
        />
    {:else if type === "checkbox"}
        <input
            class="w-full outline-none"
            type="checkbox"
            bind:checked={value}
        />
    {:else if type === "dropdown"}
        <select class="w-full bg-transparent outline-none" bind:value>
            <slot />
        </select>
    {/if}
</div>

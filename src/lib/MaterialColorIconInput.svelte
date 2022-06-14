<script lang="ts">
    export let icon: string;
    export let label: string;
    export let value: string;
</script>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 themed-dim-text select-none">
        {icon}
    </span>
    <div class="group flex flex-grow flex-col">
        <span
            class="themed-dim-text group-focus-within:themed-accent-primary-text text-xs"
        >
            {label}
        </span>
        <div class="flex">
            <input
                class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none"
                type="text"
                required
                bind:value
            />
            <input type="color" bind:value />
        </div>
    </div>
</div>

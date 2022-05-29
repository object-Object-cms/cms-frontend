<script lang="ts">
    export let icon: string;
    export let label: string;
    export let value: string;
</script>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 select-none text-gray-600">
        {icon}
    </span>
    <div class="group flex flex-grow flex-col">
        <span class="text-xs text-gray-600 group-focus-within:text-blue-600">
            {label}
        </span>
        <div class="flex">
            <input
                class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                type="text"
                required
                bind:value
            />
            <input type="color" bind:value />
        </div>
    </div>
</div>

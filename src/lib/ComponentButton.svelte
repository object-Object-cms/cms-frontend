<script lang="ts">
    export let name: string;
    export let icon = "square";
    export let selected = false;
</script>

<div
    class="flex select-none items-center space-x-4 px-2 py-1 hover:bg-slate-600"
    class:bg-slate-700={selected}
    title={name}
    on:click
>
    <span class="material-icons-outlined md-18">{icon}</span>
    <span class="overflow-hidden overflow-ellipsis whitespace-nowrap"
        >{name}</span
    >
</div>

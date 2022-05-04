<script lang="ts">
    export let name;
    export let icon = "square";
</script>

<div
    class="flex select-none items-center space-x-4 px-2 py-1 hover:bg-slate-600"
    title={name}
    on:click
>
    <span class="material-icons-outlined md-18">{icon}</span>
    <span>{name}</span>
</div>

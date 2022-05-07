<script lang="ts">
    export let icon: string;
    export let inverted = false;
</script>

<div
    class="group relative flex h-32 w-32 cursor-pointer select-none flex-col items-center justify-center rounded-full p-1 transition-colors
        {inverted ? 'hover:bg-white' : 'hover:bg-black'} hover:bg-opacity-20"
    on:click
>
    <span class="material-icons md-48">{icon}</span>
    <slot />
</div>

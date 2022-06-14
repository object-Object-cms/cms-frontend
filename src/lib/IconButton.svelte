<script lang="ts">
    import { iconsInverted } from "./IconColors";

    export let icon: string;
    export let inverted = false;
    $: _inv = inverted || $iconsInverted;
</script>

<div
    class="group relative flex h-32 w-32 cursor-pointer select-none flex-col items-center justify-center rounded-full p-2 text-center transition-colors
        {_inv ? 'hover:bg-white' : 'hover:bg-black'} hover:bg-opacity-20"
    on:click
>
    <span class="material-icons md-48">{icon}</span>
    <slot />
</div>

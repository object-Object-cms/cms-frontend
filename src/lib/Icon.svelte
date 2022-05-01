<script lang="ts">
    export let tooltip: string | undefined = undefined;
</script>

<div class="icon group relative" on:click>
    <span class="material-icons"><slot /></span>
    {#if tooltip}
        <span
            class="pointer-events-none invisible absolute left-1/2 top-full z-50 w-max -translate-x-1/2 translate-y-1
                rounded-sm bg-black bg-opacity-60 px-2 py-1 font-medium text-white opacity-0
                transition-[opacity,visibility] group-hover:visible group-hover:opacity-100 group-hover:delay-1000"
        >
            {tooltip}
        </span>
    {/if}
</div>

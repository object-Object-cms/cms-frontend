<script lang="ts">
    export let direction: "left" | "right";
    export let color: "white" | "black";
</script>

<div
    class="absolute top-0 bottom-0 flex cursor-pointer flex-col justify-center p-4 transition-colors
        hover:bg-neutral-600 hover:bg-opacity-30
        {color === 'white' ? 'text-white' : 'text-black'}
        {direction === 'left' ? 'left-0' : 'right-0'}"
    on:click
>
    <span class="material-icons select-none">
        {direction === "left" ? "arrow_back_ios" : "arrow_forward_ios"}
    </span>
</div>

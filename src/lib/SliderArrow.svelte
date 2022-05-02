<script lang="ts">
    export let direction: "left" | "right";
</script>

<div
    class="absolute top-0 bottom-0 flex cursor-pointer flex-col justify-center p-4 text-white
        hover:bg-neutral-600 hover:bg-opacity-30
        {direction === 'left' ? 'left-0' : 'right-0'}"
    on:click
>
    <span class="material-icons select-none drop-shadow">
        {direction === "left" ? "arrow_back_ios" : "arrow_forward_ios"}
    </span>
</div>

<script lang="ts">
    export let direction: "left" | "right";
</script>

<div
    class="flex cursor-pointer flex-col justify-center p-4 transition-colors
        hover:bg-neutral-600 hover:bg-opacity-30"
    on:click
>
    <span class="material-icons select-none">
        {direction === "left" ? "arrow_back_ios" : "arrow_forward_ios"}
    </span>
</div>

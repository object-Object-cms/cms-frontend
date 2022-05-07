<script lang="ts">
    import { slide } from "svelte/transition";

    import PhotoPickModalMain from "./PhotoPickModalMain.svelte";
    import PhotoPickModalLocal from "./PhotoPickModalLocal.svelte";
    import PhotoPickModalGallery from "./PhotoPickModalGallery.svelte";

    export let closeModal: () => void;
    export let responseHandler: (blobId: number) => void;
    let page = 0;

    function changePage(ev: CustomEvent) {
        page = ev.detail.page;
    }
</script>

<div
    class="{page === 2
        ? 'h-5/6 w-11/12'
        : 'h-96 w-72'} max-w-full overflow-hidden rounded-lg bg-white text-black"
>
    {#if page === 0}
        <div class="h-full" transition:slide>
            <PhotoPickModalMain
                on:changePage={changePage}
                on:modalCloseRequested={closeModal}
            />
        </div>
    {:else if page === 1}
        <div class="h-full" transition:slide>
            <PhotoPickModalLocal
                on:changePage={changePage}
                on:modalCloseRequested={closeModal}
                {responseHandler}
            />
        </div>
    {:else if page === 2}
        <div class="h-full" transition:slide>
            <PhotoPickModalGallery
                on:changePage={changePage}
                on:modalCloseRequested={closeModal}
                {responseHandler}
            />
        </div>
    {/if}
</div>

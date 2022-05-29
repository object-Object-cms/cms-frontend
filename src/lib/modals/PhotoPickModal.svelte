<script lang="ts">
    import { slide } from "svelte/transition";

    import PhotoPickModalMain from "./PhotoPickModalMain.svelte";
    import PhotoPickModalLocal from "./PhotoPickModalLocal.svelte";
    import PhotoPickModalGallery from "./PhotoPickModalGallery.svelte";

    export let closeModal: () => void;
    export let responseHandler: (blobId: number) => void;
    export let extra: { forcePage?: number; pageExtra: any } | undefined;
    let page = extra?.forcePage ?? 0;
    const forced = extra?.forcePage != null;

    function changePage(ev: CustomEvent) {
        if (!forced) page = ev.detail.page;
    }
</script>

<div
    class="{page === 2
        ? 'h-5/6 w-11/12'
        : 'h-96 w-72'} themed-background themed-text max-w-full overflow-hidden rounded-lg"
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
                {forced}
                extra={forced ? extra.pageExtra : undefined}
            />
        </div>
    {:else if page === 2}
        <div class="h-full" transition:slide>
            <PhotoPickModalGallery
                on:changePage={changePage}
                on:modalCloseRequested={closeModal}
                {responseHandler}
                {forced}
            />
        </div>
    {/if}
</div>

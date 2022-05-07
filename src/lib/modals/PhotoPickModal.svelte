<script lang="ts">
    import { slide } from "svelte/transition";

    import PhotoPickModalMain from "./PhotoPickModalMain.svelte";
    import PhotoPickModalLocal from "./PhotoPickModalLocal.svelte";
    // import NotificationSoundModalYoutube from "./NotificationSoundModalYoutube.svelte";

    export let closeModal: () => void;
    export let responseHandler: (blobId: number) => void;
    let page = 0;

    function changePage(ev: CustomEvent) {
        page = ev.detail.page;
    }
</script>

<div class="h-96 w-72 max-w-full rounded-lg bg-white text-black">
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
        <!-- {:else if page === 2}
        <div class="h-full" transition:slide>
            <NotificationSoundModalYoutube on:changePage={changePage} on:modalCloseRequested={closeModal} />
        </div> -->
    {/if}
</div>

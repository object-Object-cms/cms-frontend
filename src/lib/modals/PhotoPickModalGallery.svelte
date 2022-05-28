<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import ModalIcon from "./ModalIcon.svelte";
    import Gallery from "../../routes/Gallery.svelte";

    export let responseHandler: (blobId: number) => void;
    export let forced: boolean;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("modalCloseRequested");
    }

    function changePage(id) {
        dispatch("changePage", { page: id });
    }

    function photoPicked(blobId: number) {
        responseHandler(blobId);
        closeModal();
    }
</script>

<div class="flex h-full flex-col">
    <div class="flex items-center justify-between p-2">
        {#if forced}
            <span class="w-6" />
        {:else}
            <ModalIcon on:click={() => changePage(0)}>arrow_back</ModalIcon>
        {/if}
        <span class="text-xl font-bold">Gallery</span>
        <ModalIcon on:click={closeModal}>close</ModalIcon>
    </div>
    <div class="overflow-auto">
        <Gallery picker={true} responseHandler={photoPicked} />
    </div>
</div>

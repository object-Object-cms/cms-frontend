<script lang="ts">
    import PhotoEdit from "../lib/PhotoEdit.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { getBlobs } from "../Server";
    import { openModal } from "../lib/modals/modalUtils";
    import PhotoPickModal from "../lib/modals/PhotoPickModal.svelte";

    let photos;
    let refreshing = false;

    async function refreshPhotos() {
        refreshing = true;
        photos = (await getBlobs()).filter((blob) =>
            blob.type.startsWith("image/")
        );
        refreshing = false;
    }

    function uploadPhoto() {
        openModal(PhotoPickModal, refreshPhotos, {
            forcePage: 1,
            pageExtra: { addToGallery: true }
        });
    }
</script>

{#await refreshPhotos()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then}
    {#if refreshing}
        <div class="p-8">
            <LoadIndicator />
        </div>
    {:else}
        <button
            class="button button-blue block mx-auto m-4"
            on:click={uploadPhoto}>Upload new photo</button
        >
    {/if}
    <div class="container mx-auto divide-y divide-gray-400">
        {#each photos as photo}
            <PhotoEdit {photo} />
        {/each}
    </div>
{/await}

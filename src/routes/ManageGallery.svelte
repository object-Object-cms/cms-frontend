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
        <div class="p-4">
            <button
                class="button button-themed-primary block mx-auto"
                on:click={uploadPhoto}
            >
                Upload new photo
            </button>
        </div>
    {/if}
    <div class="container mx-auto divide-y themed-divide">
        {#each photos as photo}
            <PhotoEdit {photo} />
        {/each}
    </div>
{/await}

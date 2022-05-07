<script lang="ts">
    import GalleryArrow from "../lib/GalleryArrow.svelte";
    import Icon from "../lib/Icon.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import PageHeader from "../lib/PageHeader.svelte";

    import { clampWithRollover } from "../lib/utils";
    import { APIBlob, getBlobs, getBlobUrl } from "../Server";

    async function loadPhotos(): Promise<APIBlob[]> {
        return (await getBlobs()).filter((blob) =>
            blob.type.startsWith("image/")
        );
    }

    let currentPhoto = 0;
    let fullscreenGalleryShown = false;
    let imageScroller: HTMLDivElement | undefined;
    export let picker = false;
    export let responseHandler: (blobId: number) => void = () => {};

    const FULLSCREEN_THUMBNAIL_WIDTH = 128 + 16;

    function centerCurrentPhoto() {
        imageScroller.scroll(
            FULLSCREEN_THUMBNAIL_WIDTH / 2 +
                FULLSCREEN_THUMBNAIL_WIDTH * currentPhoto,
            0
        );
    }

    function prevPhoto(len: number) {
        currentPhoto = clampWithRollover(0, len - 1, currentPhoto - 1);
        centerCurrentPhoto();
    }

    function nextPhoto(len: number) {
        currentPhoto = clampWithRollover(0, len - 1, currentPhoto + 1);
        centerCurrentPhoto();
    }

    function setCurrentPhoto(index: number, len: number) {
        if (index >= 0 && index < len) {
            currentPhoto = index;
            centerCurrentPhoto();
        }
    }

    function showFullscreenGallery() {
        fullscreenGalleryShown = true;
    }

    function hideFullscreenGallery() {
        fullscreenGalleryShown = false;
    }
</script>

<PageHeader>{picker ? "Pick a photo" : "Gallery"}</PageHeader>

{#await loadPhotos()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then photos}
    <div class="container flex flex-wrap mx-auto p-2 justify-center">
        {#each photos as photo, i}
            <div
                class="w-48 h-48 m-2 bg-cover bg-center border-2 border-gray-600 cursor-pointer hover:scale-105"
                style="background-image: url({getBlobUrl(photo.id)});"
                on:click={() => {
                    if (picker) {
                        responseHandler(photo.id);
                    } else {
                        setCurrentPhoto(i, photos.length);
                        showFullscreenGallery();
                    }
                }}
            />
        {/each}
    </div>

    <div
        class="flex flex-col fixed left-0 top-0 right-0 bottom-0 bg-black text-white z-50
            transition-[visibility,opacity]
            {fullscreenGalleryShown
            ? 'visible opacity-100'
            : 'invisible opacity-0'}"
    >
        <div class="flex p-2 justify-end flex-shrink-0">
            <Icon
                inverted={true}
                tooltip="Close"
                on:click={hideFullscreenGallery}>close</Icon
            >
        </div>
        <div class="flex flex-grow min-h-0">
            <GalleryArrow
                direction="left"
                on:click={() => prevPhoto(photos.length)}
            />

            <div class="flex flex-grow items-center justify-center py-2">
                {#each photos as photo, i}
                    {#if currentPhoto === i}
                        <img
                            class="max-h-full"
                            src={getBlobUrl(photo.id)}
                            alt="Gallery fullscreen"
                        />
                    {/if}
                {/each}
            </div>
            <GalleryArrow
                direction="right"
                on:click={() => nextPhoto(photos.length)}
            />
        </div>
        <p class="text-center flex-shrink-0">
            Photo {currentPhoto + 1} of {photos.length}
        </p>
        <div class="overflow-auto flex-shrink-0" bind:this={imageScroller}>
            <div class="flex w-max px-[50%]">
                {#each photos as photo, i}
                    <div
                        class="w-32 h-32 bg-cover bg-center flex-shrink-0 m-2 border-2 cursor-pointer hover:scale-105
                            {currentPhoto === i
                            ? 'border-blue-600'
                            : 'border-gray-600'}"
                        style="background-image: url({getBlobUrl(photo.id)});"
                        on:click={() => setCurrentPhoto(i, photos.length)}
                    />
                {/each}
            </div>
        </div>
    </div>
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load gallery due to: {error}
    </p>
{/await}

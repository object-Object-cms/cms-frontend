<script lang="ts">
    import { openModal } from "../lib/modals/modalUtils";
    import PhotoPickModal from "../lib/modals/PhotoPickModal.svelte";
    import Icon from "../lib/Icon.svelte";
    import { createArticle, getBlobUrl } from "../Server";
    import RootGrid from "../lib/RootGrid.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { push } from "svelte-spa-router";

    let title = "";
    let description = "";
    let category = "";
    let bannerImage = "";
    let gatheredMetadata = false;
    let creating = false;
    let error = "";

    let rootGrid: RootGrid;

    function photoPicked(blobId: number) {
        bannerImage = `${blobId}`;
    }

    function pickBannerImage() {
        openModal(PhotoPickModal, photoPicked);
    }

    function discardLayout() {
        dispatchEvent(new Event("hideMenubarAcceptors"));
        gatheredMetadata = false;
    }

    async function acceptLayout() {
        dispatchEvent(new Event("hideMenubarAcceptors"));
        const layout = rootGrid.exportGrid();
        console.log("layout:", layout);
        const component = {
            name: "RootGrid",
            props: {
                subComponents: layout
            }
        };
        creating = true;
        try {
            const id = await createArticle(
                title,
                description,
                bannerImage,
                category,
                component
            );
            push("/article/" + id);
        } catch (err) {
            error = err.message;
            creating = false;
            gatheredMetadata = false;
        }
    }

    function metadataEntered(ev: SubmitEvent) {
        ev.preventDefault();
        if (bannerImage === "") {
            alert("Please select a banner image!");
            return;
        }
        gatheredMetadata = true;
        dispatchEvent(
            new CustomEvent("showMenubarAcceptors", {
                detail: {
                    cancelHandler: discardLayout,
                    acceptHandler: acceptLayout
                }
            })
        );
    }
</script>

{#if creating}
    <div class="p-8">
        <LoadIndicator />
        <p class="text-center text-2xl">Creating article...</p>
    </div>
{:else if gatheredMetadata}
    <RootGrid editingMode={true} bind:this={rootGrid} />
{:else}
    <div class="mx-auto max-w-xl p-4">
        <form class="space-y-4 p-4 shadow-md" on:submit={metadataEntered}>
            <h1 class="text-2xl font-bold">Create new article</h1>
            {#if error}
                <p class="text-red-600">Failed to create article: {error}</p>
            {/if}
            <div class="flex items-end space-x-2">
                <span
                    class="material-icons-outlined md-36 select-none text-gray-600"
                >
                    title
                </span>
                <div class="group flex flex-grow flex-col">
                    <span
                        class="text-xs text-gray-600 group-focus-within:text-blue-600"
                    >
                        Title
                    </span>
                    <input
                        class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                        type="text"
                        required
                        minlength="5"
                        bind:value={title}
                    />
                </div>
            </div>

            <div class="flex items-end space-x-2">
                <span
                    class="material-icons-outlined md-36 select-none text-gray-600"
                >
                    description
                </span>
                <div class="group flex flex-grow flex-col">
                    <span
                        class="text-xs text-gray-600 group-focus-within:text-blue-600"
                    >
                        Description
                    </span>
                    <input
                        class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                        type="text"
                        required
                        minlength="10"
                        bind:value={description}
                    />
                </div>
            </div>

            <div class="flex items-end space-x-2">
                <span
                    class="material-icons-outlined md-36 select-none text-gray-600"
                >
                    category
                </span>
                <div class="group flex flex-grow flex-col">
                    <span
                        class="text-xs text-gray-600 group-focus-within:text-blue-600"
                    >
                        Category
                    </span>
                    <input
                        class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                        type="text"
                        required
                        minlength="5"
                        bind:value={category}
                    />
                </div>
            </div>

            <div class="flex items-end space-x-2">
                <span
                    class="material-icons-outlined md-36 select-none text-gray-600"
                >
                    image
                </span>
                <div class="group flex flex-grow flex-col">
                    <span
                        class="text-xs text-gray-600 group-focus-within:text-blue-600"
                    >
                        Banner image
                    </span>
                    <div class="w-full flex items-center">
                        {#if bannerImage}
                            <img
                                class="min-w-0 mr-2"
                                src={getBlobUrl(bannerImage)}
                                alt="Selected banner"
                            />
                        {:else}
                            <span>No banner selected</span>
                        {/if}
                        <span class="text-gray-600 ml-auto">
                            <Icon on:click={pickBannerImage}>file_upload</Icon>
                        </span>
                    </div>
                </div>
            </div>

            <button class="button button-blue" type="submit">Next</button>
        </form>
    </div>
{/if}
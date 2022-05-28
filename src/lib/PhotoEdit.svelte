<script lang="ts">
    import { APIBlob, editBlob, getBlobUrl } from "../Server";
    import LoadIndicator from "./LoadIndicator.svelte";

    export let photo: APIBlob;

    let saving = false;
    let error = "";
    let showInGallery = photo.showInGallery === 1;

    async function save() {
        if (saving) return;
        saving = true;
        error = "";
        try {
            await editBlob(photo.id, showInGallery);
        } catch (err) {
            error = err.message;
        }
        saving = false;
    }
</script>

<div class="flex space-x-4 p-2">
    <img
        class="max-h-64 w-1/2 object-contain"
        src={getBlobUrl(photo.id)}
        alt="Gallery manager"
    />
    <div class="flex flex-col">
        <p class="text-2xl">Photo: {photo.id}</p>
        <p>Type: {photo.type}</p>
        <label>
            Show in gallery:
            <input type="checkbox" bind:checked={showInGallery} />
        </label>
        <div class="mt-auto" />
        {#if error}
            <p class="text-red-600">Failed to save: {error}</p>
        {/if}
        <button class="button button-blue" on:click={save} disabled={saving}>
            {#if saving}
                <LoadIndicator />
            {:else}
                Save
            {/if}
        </button>
    </div>
</div>

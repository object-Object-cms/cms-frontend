<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import ModalIcon from "./ModalIcon.svelte";
    import ClearButton from "./ClearButton.svelte";
    import { uploadBlob } from "../../Server";
    import LoadIndicator from "../LoadIndicator.svelte";

    export let responseHandler: (blobId: number) => void;
    export let forced: boolean;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("modalCloseRequested");
    }

    function changePage(id) {
        dispatch("changePage", { page: id });
    }

    let photoFilePicker;

    function openFilePicker() {
        photoFilePicker.click();
    }

    let uploading = false;
    let error = "";

    async function upload(file: Blob) {
        if (uploading) return;
        uploading = true;
        error = "";
        try {
            const id = await uploadBlob(file);
            responseHandler(id);
            closeModal();
        } catch (err) {
            error = err.message;
        }
        uploading = false;
    }

    function photoSelected(ev: Event) {
        const input = ev.target as HTMLInputElement;
        const [file] = input.files;
        console.log(file);
        upload(file);
    }

    let didDragEnter = false;

    function dragEnter() {
        didDragEnter = true;
    }

    function draggedOver(ev: DragEvent) {
        ev.preventDefault();
        didDragEnter = true;
    }

    function dragLeave() {
        didDragEnter = false;
    }

    function photoFileDropped(ev: DragEvent) {
        ev.preventDefault();
        didDragEnter = false;

        const file = ev.dataTransfer.files[0];
        if (file) {
            console.log(file);
            if (file.type.startsWith("image/")) {
                upload(file);
            } else {
                alert("Only image files are supported!");
            }
        }
    }
</script>

<div class="flex h-full flex-col p-2">
    <div class="flex items-center justify-between">
        {#if forced}
            <span class="w-6" />
        {:else}
            <ModalIcon on:click={() => changePage(0)}>arrow_back</ModalIcon>
        {/if}
        <span class="text-xl font-bold">Local file</span>
        <ModalIcon on:click={closeModal}>close</ModalIcon>
    </div>
    {#if uploading}
        <LoadIndicator />
    {:else}
        {#if error}
            <p class="text-red-600 text-center">{error}</p>
        {/if}
        <div
            class="flex flex-col items-center justify-center rounded-xl m-1 flex-grow {didDragEnter
                ? 'border-4 border-blue-700 border-dashed'
                : ''}"
            on:dragenter={dragEnter}
            on:dragover={draggedOver}
            on:dragleave={dragLeave}
            on:drop={photoFileDropped}
        >
            <span class="text-2xl">Drop a file</span>
            <span>or</span>
            <ClearButton on:click={openFilePicker}>Open file picker</ClearButton
            >
        </div>
    {/if}
</div>

<input
    type="file"
    accept="image/*"
    bind:this={photoFilePicker}
    on:input={photoSelected}
    hidden
/>

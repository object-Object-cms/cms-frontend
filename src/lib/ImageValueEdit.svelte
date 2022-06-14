<script lang="ts">
    import { openModal } from "./modals/modalUtils";
    import PhotoPickModal from "./modals/PhotoPickModal.svelte";

    export let name: string;
    export let value: any;

    function photoPicked(blobId: number) {
        value = `$${blobId}`;
    }

    function pickPhoto() {
        openModal(PhotoPickModal, photoPicked);
    }
</script>

<div class="w-1/3 overflow-hidden pl-2 hover:overflow-visible">
    <div class="relative z-50 w-max hover:bg-slate-500">
        {name}
    </div>
</div>
<div class="flex w-2/3 items-center">
    <input class="min-w-0 bg-transparent outline-none" type="text" bind:value />
    <div
        class="mx-1 h-5 w-5 cursor-pointer select-none rounded border
            border-slate-800 bg-slate-700 hover:border-slate-700 hover:bg-slate-600"
        on:click={pickPhoto}
    >
        <span class="material-icons md-18">image</span>
    </div>
</div>

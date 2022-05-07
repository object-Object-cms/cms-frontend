<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import ModalIcon from "./ModalIcon.svelte";
    import TallButton from "./TallButton.svelte";

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch("modalCloseRequested");
    }

    function changePage(id) {
        dispatch("changePage", { page: id });
    }
</script>

<div class="flex flex-col p-2">
    <div class="flex items-center justify-between">
        <span class="w-6" />
        <span class="text-xl font-bold">Pick a photo</span>
        <ModalIcon on:click={closeModal}>close</ModalIcon>
    </div>
    <div class="flex flex-col space-y-2 px-2 py-4">
        <TallButton on:click={() => changePage(1)}>
            <span class="material-icons">file_upload</span>
            <span>Select a local file</span>
        </TallButton>
        <TallButton on:click={() => changePage(2)}>
            <span class="material-icons">image</span>
            <span>Choose from gallery</span>
        </TallButton>
    </div>
</div>

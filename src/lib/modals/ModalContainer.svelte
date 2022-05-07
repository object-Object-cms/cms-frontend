<script lang="ts">
    import { fade, scale } from "svelte/transition";

    let currentModal;
    let responseHandler: (...args: any[]) => void;

    function openModal(modal, handler: (...args: any[]) => void) {
        currentModal = modal;
        responseHandler = handler;
    }

    function closeModal() {
        currentModal = undefined;
        responseHandler = undefined;
    }

    addEventListener("requestModalOpen", (ev: CustomEvent) => {
        openModal(ev.detail.modal, ev.detail.responseHandler);
    });

    addEventListener("requestModalClose", () => closeModal());
</script>

<div
    class="pointer-events-none absolute left-0 top-0 right-0 bottom-0 z-[1000]"
>
    {#if currentModal}
        <div
            class="pointer-events-auto fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-80 transition-colors"
            transition:fade={{ duration: 150 }}
            on:click={closeModal}
        />
        <div
            class="fixed left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center"
            transition:scale={{ duration: 150 }}
        >
            <div class="pointer-events-auto contents">
                <svelte:component
                    this={currentModal}
                    {closeModal}
                    {responseHandler}
                />
            </div>
        </div>
    {/if}
</div>

<script lang="ts">
    import ArticleList from "../../routes/ArticleList.svelte";
    import ModalIcon from "./ModalIcon.svelte";

    export let closeModal: () => void;
    export let responseHandler: (id: string) => void;
    export let extra: { action: string };

    function articlePicked(id: string) {
        responseHandler(id);
        closeModal();
    }
</script>

<div
    class="flex h-5/6 w-11/12 max-w-full flex-col overflow-hidden rounded-lg bg-white text-black"
>
    <div class="flex items-center justify-between p-2">
        <span class="w-6" />
        <span class="text-xl font-bold">{extra.action ?? "Pick"} article</span>
        <ModalIcon on:click={closeModal}>close</ModalIcon>
    </div>
    <div class="overflow-auto">
        <ArticleList picker={true} responseHandler={articlePicked} />
    </div>
</div>

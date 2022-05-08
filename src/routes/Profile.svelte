<script lang="ts">
    import { push } from "svelte-spa-router";
    import { currentAccount, getAccountType, logout } from "../AccountManager";
    import { openModal } from "../lib/modals/modalUtils";

    import Icon from "../lib/Icon.svelte";
    import IconButton from "../lib/IconButton.svelte";
    import ArticlePickModal from "../lib/modals/ArticlePickModal.svelte";

    function handleLogout() {
        push("/");
        logout();
    }

    function articlePicked(id: string) {
        push("/editArticle/" + id);
    }

    function editArticle() {
        openModal(ArticlePickModal, articlePicked);
    }
</script>

{#if $currentAccount}
    <div class="bg-gray-300 p-4">
        <div class="container mx-auto flex flex-col">
            <div class="flex justify-end">
                <Icon tooltip="Logout" on:click={handleLogout}>logout</Icon>
            </div>
            <div class="flex items-center space-x-2 pt-16">
                <span class="material-icons select-none text-6xl">person</span>
                <div>
                    <p class="text-2xl">{$currentAccount.username}</p>
                    <p>{getAccountType($currentAccount.accessLevel)}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="container mx-auto mt-4 flex flex-wrap gap-4">
        {#if $currentAccount.accessLevel < 50}
            <p>You have no available actions.</p>
        {:else if $currentAccount.accessLevel >= 50}
            <IconButton icon="add" on:click={() => push("/newArticle")}>
                Add article
            </IconButton>
            <IconButton icon="edit" on:click={editArticle}>
                Edit article
            </IconButton>
        {/if}
        {#if $currentAccount.accessLevel >= 100}
            <IconButton icon="home" on:click={() => push("/editCore/HOME")}>
                Edit home page
            </IconButton>
        {/if}
    </div>
{:else}
    <p class="text-4xl text-center mt-4">You are not logged in.</p>
{/if}

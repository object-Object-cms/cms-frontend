<script lang="ts">
    import { push } from "svelte-spa-router";
    import { currentAccount, getAccountType, logout } from "../AccountManager";
    import { openModal } from "../lib/modals/modalUtils";
    import { changePassword, deleteArticle } from "../Server";

    import Icon from "../lib/Icon.svelte";
    import IconButton from "../lib/IconButton.svelte";
    import ArticlePickModal from "../lib/modals/ArticlePickModal.svelte";
    import PasswordChangeModal from "../lib/modals/PasswordChangeModal.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";

    interface Status {
        message: string;
        type: "success" | "error";
    }

    let changingPassword = false;
    let deleting = false;

    let status: Status = null;

    function handleLogout() {
        push("/");
        logout();
    }

    function articleEditPicked(id: string) {
        push("/editArticle/" + id);
    }

    async function articleDeletePicked(id: string) {
        if (deleting) return;
        status = null;
        deleting = true;
        try {
            await deleteArticle(id);
        } catch (err) {
            status = {
                message: `Failed to delete article: ${err.message}`,
                type: "error"
            };
        }
        deleting = false;
    }

    async function newPasswordSubmitted(password: string) {
        if (changingPassword) return;
        status = null;
        changingPassword = true;
        try {
            await changePassword(password);
            status = {
                message: "Password changed successfully",
                type: "success"
            };
        } catch (err) {
            status = {
                message: `Failed to change password: ${err.message}`,
                type: "error"
            };
        }
        changingPassword = false;
    }

    function editArticle() {
        openModal(ArticlePickModal, articleEditPicked, { action: "Edit" });
    }

    function handleDeleteArticle() {
        openModal(ArticlePickModal, articleDeletePicked, { action: "Delete" });
    }

    function handleChangePassword() {
        openModal(PasswordChangeModal, newPasswordSubmitted);
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
    {#if status}
        <p
            class="text-center {status.type === 'success'
                ? 'text-green-600'
                : 'text-red-600'}"
        >
            {status.message}
        </p>
    {/if}
    <div class="container mx-auto mt-4 flex flex-wrap justify-center gap-4">
        {#if changingPassword}
            <div class="h-32 w-32">
                <LoadIndicator />
            </div>
        {:else}
            <IconButton icon="lock" on:click={handleChangePassword}>
                Change password
            </IconButton>
        {/if}
        {#if $currentAccount.accessLevel >= 50}
            <IconButton icon="add" on:click={() => push("/newArticle")}>
                Add article
            </IconButton>
            <IconButton icon="edit" on:click={editArticle}>
                Edit article
            </IconButton>
            {#if deleting}
                <div class="h-32 w-32">
                    <LoadIndicator />
                </div>
            {:else}
                <IconButton icon="delete" on:click={handleDeleteArticle}>
                    Delete article
                </IconButton>
            {/if}
        {/if}
        {#if $currentAccount.accessLevel >= 100}
            <IconButton icon="home" on:click={() => push("/editCore/HOME")}>
                Edit home page
            </IconButton>
            <IconButton
                icon="linear_scale"
                on:click={() => push("/editMenubar")}
            >
                Edit menubar
            </IconButton>
            <IconButton icon="person" on:click={() => push("/manageUsers")}>
                Manage users
            </IconButton>
        {/if}
    </div>
{:else}
    <p class="text-4xl text-center mt-4">You are not logged in.</p>
{/if}

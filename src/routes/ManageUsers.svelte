<script lang="ts">
    import UserEdit from "../lib/UserEdit.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { getUsers } from "../Server";

    let users;
    let error = "";
    let editingUser;
    let updating = false;

    async function refreshUsers() {
        users = await getUsers();
    }

    function handleUpdateBegin() {
        error = "";
        updating = true;
    }

    async function handleUpdateSuccess() {
        await refreshUsers();
        updating = false;
    }

    function handleUpdateError(ev: CustomEvent) {
        error = `Failed to ${ev.detail.action} user: ${ev.detail.err.message}`;
        updating = false;
    }

    function storeEditingUser(user) {
        if (editingUser) editingUser.editing = false;
        editingUser = user;
    }
</script>

{#await refreshUsers()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then}
    {#if error}
        <p class="text-red-600 text-center">{error}</p>
    {/if}
    <div
        class="container mx-auto border sm:mt-1 divide-y border-gray-200 divide-gray-200"
    >
        <div class="flex p-2 items-center">
            <div class="w-2/12 sm:w-1/12">id</div>
            <div class="w-7/12 sm:w-6/12">username</div>
            <div class="w-3/12 sm:w-2/12 text-right sm:text-left">
                access level
            </div>
        </div>
        {#each users as user (user.id)}
            <UserEdit
                {user}
                disabled={updating}
                bind:editing={user.editing}
                bind:updating={user.updating}
                on:enterEdit={() => storeEditingUser(user)}
                on:updateBegin={handleUpdateBegin}
                on:updateSuccess={handleUpdateSuccess}
                on:updateError={handleUpdateError}
            />
        {/each}
    </div>
{:catch err}
    <p class="text-red-600 text-center">
        Failed to load user list: {err.message}
    </p>
{/await}

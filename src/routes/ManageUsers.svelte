<script lang="ts">
    import UserEdit from "../lib/UserEdit.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { createUser, getUsers } from "../Server";
    import Icon from "../lib/Icon.svelte";
    import { openModal } from "../lib/modals/modalUtils";
    import PasswordModal from "../lib/modals/PasswordModal.svelte";

    let users;
    let error = "";
    let editingUser;
    let updating = false;
    let creating = false;

    let addUsername = "";
    let addAccessLevel = 0;

    async function refreshUsers() {
        users = await getUsers();
        editingUser = undefined;
    }

    async function passwordSubmitted(password) {
        if (updating || creating) return;
        updating = true;
        creating = true;
        try {
            await createUser(addUsername, password, addAccessLevel);
            try {
                await refreshUsers();
                addUsername = "";
                addAccessLevel = 0;
            } catch (err) {
                error = `Creation failed: Failed to refresh user list: ${err.message}`;
            }
        } catch (err) {
            error = `Failed to add user: ${err.message}`;
        }
        updating = false;
        creating = false;
    }

    function addUser() {
        if (addUsername.length < 3) {
            alert("Username must be at least 3 characters long");
        } else if (addAccessLevel >= 0 && addAccessLevel <= 100) {
            openModal(PasswordModal, passwordSubmitted, { mode: "set" });
        } else {
            alert("Access level must be in range 0-100");
        }
    }

    function handleUpdateBegin() {
        error = "";
        updating = true;
    }

    async function handleUpdateSuccess() {
        try {
            await refreshUsers();
        } catch (err) {
            error = `Update failed: Failed to refresh user list: ${err.message}`;
        }
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
    <div class="sm:pt-1">
        <div
            class="container mx-auto border divide-y themed-divide-border themed-divide"
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
                    on:clearError={() => (error = "")}
                    on:enterEdit={() => storeEditingUser(user)}
                    on:leaveEdit={() => (editingUser = undefined)}
                    on:updateBegin={handleUpdateBegin}
                    on:updateSuccess={handleUpdateSuccess}
                    on:updateError={handleUpdateError}
                />
            {/each}
            <div class="flex flex-wrap items-center p-2">
                <div class="w-2/12 sm:w-1/12" />
                <div class="w-7/12 pr-2 sm:w-6/12">
                    <input
                        class="w-full rounded border-2 themed-box-border themed-box-primary p-1 outline-none focus:themed-accent-primary-border"
                        disabled={updating}
                        bind:value={addUsername}
                    />
                </div>
                <div class="w-3/12 sm:w-2/12">
                    <input
                        class="w-full rounded border-2 themed-box-border themed-box-primary p-1 outline-none focus:themed-accent-primary-border"
                        type="number"
                        min="0"
                        max="100"
                        disabled={updating}
                        bind:value={addAccessLevel}
                    />
                </div>
                <div
                    class="mt-1 flex flex-grow justify-end space-x-2 sm:mt-0"
                    class:pointer-events-none={updating}
                    class:opacity-50={updating}
                >
                    {#if creating}
                        <LoadIndicator />
                    {:else}
                        <Icon tooltip="Add user" on:click={addUser}>add</Icon>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{:catch err}
    <p class="text-red-600 text-center">
        Failed to load user list: {err.message}
    </p>
{/await}

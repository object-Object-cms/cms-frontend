<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { APIUser, deleteUser, editUser } from "../Server";
    import Icon from "./Icon.svelte";
    import LoadIndicator from "./LoadIndicator.svelte";
    import { openModal } from "./modals/modalUtils";
    import PasswordModal from "./modals/PasswordModal.svelte";

    export let user: APIUser;
    export let disabled = false;
    export let editing = false;
    export let updating = false;

    const dispatch = createEventDispatcher();

    let editUsername = user.username;
    let editAccessLevel = user.accessLevel;
    let editPassword;

    function enterEdit() {
        editing = true;
        dispatch("enterEdit");
        editUsername = user.username;
        editAccessLevel = user.accessLevel;
        editPassword = undefined;
    }

    function leaveEdit() {
        editing = false;
        dispatch("leaveEdit");
    }

    async function saveChanges() {
        if (
            editUsername === user.username &&
            editAccessLevel === user.accessLevel
        ) {
            console.log("no changes");
            dispatch("clearError");
            leaveEdit();
        } else if (editUsername.length < 3) {
            alert("Username must be at least 3 characters long");
        } else if (editAccessLevel >= 0 && editAccessLevel <= 100) {
            console.log("saving changes");
            if (updating) return;
            updating = true;
            dispatch("updateBegin");
            try {
                await editUser(
                    user.id,
                    editUsername,
                    editAccessLevel,
                    editPassword
                );
                editPassword = undefined;
                dispatch("updateSuccess");
            } catch (err) {
                dispatch("updateError", { err, action: "edit" });
                updating = false;
            }
        } else {
            alert("Access level must be in range 0-100");
        }
    }

    async function doDelete() {
        if (updating) return;
        updating = true;
        dispatch("updateBegin");
        try {
            await deleteUser(user.id);
            dispatch("updateSuccess");
        } catch (err) {
            dispatch("updateError", { err, action: "delete" });
            updating = false;
        }
    }

    function newPasswordSubmitted(password) {
        editPassword = password;
    }

    function doPasswordChange() {
        if (editPassword) {
            editPassword = undefined;
        } else {
            openModal(PasswordModal, newPasswordSubmitted, { mode: "change" });
        }
    }
</script>

<div class="flex flex-wrap items-center p-2">
    <div class="w-2/12 sm:w-1/12">{user.id}</div>
    {#if editing}
        <div class="w-7/12 pr-2 sm:w-6/12">
            <input
                class="themed-box-border themed-box-primary focus:themed-accent-primary-border w-full rounded border-2 p-1 outline-none"
                disabled={updating}
                bind:value={editUsername}
            />
        </div>
        <div class="w-3/12 sm:w-2/12">
            {#if editAccessLevel === 0 || editAccessLevel === 50 || editAccessLevel === 100}
                <select
                    class="themed-box-primary w-full p-1"
                    bind:value={editAccessLevel}
                >
                    <option value={0}>User (0)</option>
                    <option value={50}>Mod (50)</option>
                    <option value={100}>Admin (100)</option>
                    <option value={1}>Custom</option>
                </select>
            {:else}
                <input
                    class="w-full rounded border-2 themed-box-border themed-box-primary p-1 outline-none focus:themed-accent-primary-border"
                    type="number"
                    min="0"
                    max="100"
                    disabled={updating}
                    bind:value={editAccessLevel}
                />
            {/if}
        </div>
    {:else}
        <div class="w-7/12 sm:w-6/12 overflow-hidden text-ellipsis">
            {user.username}
        </div>
        <div class="w-3/12 sm:w-2/12 text-right sm:text-left">
            {user.accessLevel}
        </div>
    {/if}
    <div
        class="mt-1 flex flex-grow justify-end space-x-2 sm:mt-0"
        class:pointer-events-none={disabled}
        class:opacity-50={disabled && !updating}
    >
        {#if updating}
            <LoadIndicator />
        {:else if editing}
            <span class:themed-accent-secondary-text={editPassword}>
                <Icon
                    tooltip={editPassword
                        ? "Remove changed password"
                        : "Change password"}
                    on:click={doPasswordChange}>lock</Icon
                >
            </span>
            <Icon tooltip="Save changes" on:click={saveChanges}>done</Icon>
            <Icon tooltip="Discard changes" on:click={leaveEdit}>close</Icon>
        {:else}
            <Icon tooltip="Edit user" on:click={enterEdit}>edit</Icon>
            <Icon tooltip="Delete user" on:click={doDelete}>delete</Icon>
        {/if}
    </div>
</div>

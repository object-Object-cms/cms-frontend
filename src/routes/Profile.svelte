<script lang="ts">
    import { push } from "svelte-spa-router";
    import { currentAccount, getAccountType, logout } from "../AccountManager";

    import Icon from "../lib/Icon.svelte";

    function handleLogout() {
        push("/");
        logout();
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
{/if}
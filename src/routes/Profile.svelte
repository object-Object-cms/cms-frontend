<script lang="ts">
    import { currentAccount, getAccountType } from "../AccountManager";
    import Icon from "../lib/Icon.svelte";
</script>

<div class="bg-gray-300 p-4">
    <div class="container mx-auto flex flex-col">
        <div class="flex justify-end">
            <Icon tooltip="Logout">logout</Icon>
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

<script lang="ts">
    import Icon from "../lib/Icon.svelte";
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { getUsers } from "../Server";

    let users;

    async function refreshUsers() {
        users = await getUsers();
    }
</script>

{#await refreshUsers()}
    <LoadIndicator />
{:then}
    <div class="container mx-auto border sm:mt-1 divide-y">
        <div class="flex p-2 items-center">
            <div class="w-2/12">id</div>
            <div class="w-7/12 sm:w-6/12">username</div>
            <div class="w-3/12 sm:w-2/12 text-right sm:text-left">
                access level
            </div>
        </div>
        {#each users as user}
            <div class="flex flex-wrap p-2 items-center">
                <div class="w-2/12">{user.id}</div>
                <div class="w-7/12 sm:w-6/12 overflow-hidden text-ellipsis">
                    {user.username}
                </div>
                <div class="w-3/12 sm:w-2/12 text-right sm:text-left">
                    {user.accessLevel}
                </div>
                <div class="flex flex-grow justify-end space-x-2">
                    <Icon tooltip="Edit user">edit</Icon>
                    <Icon tooltip="Delete user">delete</Icon>
                </div>
            </div>
        {/each}
    </div>
{/await}

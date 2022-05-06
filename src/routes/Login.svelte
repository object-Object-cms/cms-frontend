<script lang="ts">
    import { push } from "svelte-spa-router";
    import { login } from "../AccountManager";

    import LoadIndicator from "../lib/LoadIndicator.svelte";

    let username = "";
    let password = "";

    let loading = false;
    let error = "";

    async function handleLogin(ev: SubmitEvent) {
        ev.preventDefault();
        if (loading) return;
        loading = true;
        error = "";
        try {
            await login(username, password);
            push("/");
        } catch (err) {
            error = err.message;
            loading = false;
        }
    }
</script>

<div class="mx-auto max-w-xl p-4">
    <form class="space-y-4 p-4 shadow-md" on:submit={handleLogin}>
        <div class="flex items-end space-x-2">
            <span
                class="material-icons-outlined md-36 select-none text-gray-600"
            >
                account_circle
            </span>
            <div class="group flex flex-grow flex-col">
                <span
                    class="text-xs text-gray-600 group-focus-within:text-blue-600"
                >
                    Login
                </span>
                <input
                    class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                    type="text"
                    required
                    disabled={loading}
                    bind:value={username}
                />
            </div>
        </div>

        <div class="flex items-end space-x-2">
            <span
                class="material-icons-outlined md-36 select-none text-gray-600"
            >
                lock
            </span>
            <div class="group flex flex-grow flex-col">
                <span
                    class="text-xs text-gray-600 group-focus-within:text-blue-600"
                >
                    Password
                </span>
                <input
                    class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                    type="password"
                    required
                    disabled={loading}
                    bind:value={password}
                />
            </div>
        </div>

        <button class="button button-blue" type="submit" disabled={loading}>
            {#if loading}
                <LoadIndicator />
            {:else}
                Login
            {/if}
        </button>
        {#if error}
            <p class="text-red-500">{error}</p>
        {/if}
    </form>
</div>

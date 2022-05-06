<script lang="ts">
    import { push } from "svelte-spa-router";
    import { register } from "../AccountManager";

    import LoadIndicator from "../lib/LoadIndicator.svelte";

    let username = "";
    let password = "";
    let confirmPassword = "";

    let loading = false;
    let error = "";

    async function handleRegistration(ev: SubmitEvent) {
        ev.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        if (loading) return;
        loading = true;
        error = "";
        try {
            await register(username, password);
            push("/");
        } catch (err) {
            error = err.message;
            loading = false;
        }
    }
</script>

<div class="mx-auto max-w-xl p-4">
    <form class="space-y-4 p-4 shadow-md" on:submit={handleRegistration}>
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
                    class="w-full border-b-2 p-1 outline-none focus:border-blue-600
                        {username.length != 0 && username.length < 5
                        ? 'border-red-500'
                        : 'border-gray-400'}"
                    type="text"
                    minlength="5"
                    required
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
                    class="w-full border-b-2 p-1 outline-none focus:border-blue-600
                        {password.length !== 0 && password.length < 8
                        ? 'border-red-500'
                        : 'border-gray-400'}"
                    type="password"
                    minlength="8"
                    required
                    bind:value={password}
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
                    Confirm Password
                </span>
                <input
                    class="w-full border-b-2 p-1 outline-none focus:border-blue-600
                        {confirmPassword.length !== 0 &&
                    (confirmPassword.length < 8 || password !== confirmPassword)
                        ? 'border-red-500'
                        : 'border-gray-400'}"
                    type="password"
                    minlength="8"
                    required
                    bind:value={confirmPassword}
                />
            </div>
        </div>

        <button class="button button-blue" type="submit" disabled={loading}>
            {#if loading}
                <LoadIndicator />
            {:else}
                Register
            {/if}
        </button>
        {#if error}
            <p class="text-red-600">{error}</p>
        {/if}
    </form>
</div>

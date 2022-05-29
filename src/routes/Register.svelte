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

    let autofocusInput: HTMLInputElement;
    $: autofocusInput?.focus();
</script>

<div class="mx-auto max-w-xl p-4">
    <form class="space-y-4 p-4 shadow-md" on:submit={handleRegistration}>
        <div class="flex items-end space-x-2">
            <span
                class="material-icons-outlined md-36 themed-dim-text select-none"
            >
                account_circle
            </span>
            <div class="group flex flex-grow flex-col">
                <span
                    class="themed-dim-text group-focus-within:themed-accent-primary-text text-xs"
                >
                    Login
                </span>
                <input
                    class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none
                        {username.length != 0 && username.length < 5
                        ? 'border-red-500'
                        : 'border-gray-400'}"
                    type="text"
                    minlength="5"
                    required
                    bind:this={autofocusInput}
                    bind:value={username}
                />
            </div>
        </div>

        <div class="flex items-end space-x-2">
            <span
                class="material-icons-outlined md-36 themed-dim-text select-none"
            >
                lock
            </span>
            <div class="group flex flex-grow flex-col">
                <span
                    class="themed-dim-text group-focus-within:themed-accent-primary-text text-xs"
                >
                    Password
                </span>
                <input
                    class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none
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
                class="material-icons-outlined md-36 themed-dim-text select-none"
            >
                lock
            </span>
            <div class="group flex flex-grow flex-col">
                <span
                    class="themed-dim-text group-focus-within:themed-accent-primary-text text-xs"
                >
                    Confirm Password
                </span>
                <input
                    class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none
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

        <button
            class="button button-themed-primary"
            type="submit"
            disabled={loading}
        >
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

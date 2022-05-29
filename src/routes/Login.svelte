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

    let autofocusInput: HTMLInputElement;
    $: autofocusInput?.focus();
</script>

<div class="mx-auto max-w-xl p-4">
    <form class="space-y-4 p-4 shadow-md" on:submit={handleLogin}>
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
                    class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none"
                    type="text"
                    required
                    disabled={loading}
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
                    class="themed-box-border focus:themed-accent-primary-border w-full border-b-2 bg-transparent p-1 outline-none"
                    type="password"
                    required
                    disabled={loading}
                    bind:value={password}
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
                Login
            {/if}
        </button>
        {#if error}
            <p class="text-red-500">{error}</p>
        {/if}
    </form>
</div>

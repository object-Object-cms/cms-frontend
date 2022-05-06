<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import { register } from "../Server";

    let username = "";
    let password = "";
    let confirmPassword = "";
    let error = "";
    let ok = false;
    let loading = false;

    async function handleRegistration(ev: SubmitEvent) {
        ev.preventDefault();
        if (loading) return;
        loading = true;
        let res = await register(username, password);
        if (res === true) {
            ok = true;
            setTimeout(() => (window.location.href = "/"), 500);
        } else {
            error = res as string;
        }
        loading = false;
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
                    class={`w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600 ${
                        username.length != 0 && username.length < 5
                            ? "bg-red-500"
                            : ""
                    }`}
                    type="text"
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
                    class={`w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600 ${
                        password != confirmPassword ||
                        (password.length < 4 && password.length !== 0)
                            ? "bg-red-500"
                            : ""
                    }`}
                    type="password"
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
                    class={`w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600 ${
                        password != confirmPassword ||
                        (password.length < 4 && password.length !== 0)
                            ? "bg-red-500"
                            : ""
                    }`}
                    type="password"
                    required
                    bind:value={confirmPassword}
                />
            </div>
        </div>

        <button
            class="button button-blue disabled:bg-slate-500"
            type="submit"
            disabled={username.length < 5 ||
                password != confirmPassword ||
                password.length < 4}
        >
            {#if loading}
                <LoadIndicator />
            {:else if ok}
                OK
            {:else}
                Register
            {/if}
        </button>
        <p class="text-red-600">{error}</p>
    </form>
</div>

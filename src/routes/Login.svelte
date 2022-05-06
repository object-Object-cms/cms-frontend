<script lang="ts">
    import { getInfo, login } from "../Server";

    import LoadIndicator from "../lib/LoadIndicator.svelte";

    let username = "";
    let password = "";

    let loading = false;
    let error = "";
    let ok = false;

    async function handleLogin() {
        loading = true;
        error = "";
        let res = await login(username, password);
        if (res === true) {
            ok = true;
            setTimeout(() => (window.location.href = "/"), 500);
        } else {
            error = res as string;
        }
        loading = false;
    }
</script>

<div class="pt-16 text-center">
    <div
        class="m-auto flex h-96 w-96 flex-col items-center justify-center rounded-md border-2 border-slate-500 bg-slate-500 p-8"
    >
        <h1 class="white text-4xl">Log In</h1>
        <span class="m-5 flex w-72 justify-between"
            ><span>Username:</span>
            <input
                class="w-48"
                type="text"
                name="username"
                disabled={loading}
                bind:value={username}
            /></span
        >
        <span class="m-5 flex w-72 justify-between"
            ><span>Password:</span>
            <input
                class="w-48"
                type="password"
                disabled={loading}
                name="password"
                bind:value={password}
            /></span
        >
        <button
            class="h-16 w-32 rounded-lg bg-slate-600 text-2xl text-white"
            on:click={handleLogin}
        >
            {#if loading}
                <LoadIndicator />
            {:else if ok}
                <p class="text-green-600">OK</p>
            {:else}
                Log In
            {/if}
        </button>
        <p class="text-red-600">{error}</p>
    </div>
</div>

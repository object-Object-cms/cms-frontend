<script lang="ts">
    let login = "";
    let password = "";

    function handleLogin(ev: SubmitEvent) {
        ev.preventDefault();
        console.log("Logging in:");
        console.log("login:", login);
        console.log("password:", password);
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
                    bind:value={login}
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
                    bind:value={password}
                />
            </div>
        </div>

        <button class="button button-blue" type="submit">Login</button>
    </form>
</div>

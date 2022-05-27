<script lang="ts">
    import ModalIcon from "./ModalIcon.svelte";

    export let closeModal: () => void;
    export let responseHandler: (password: string) => void;
    export let extra: { mode: string };

    let password = "";
    let confirmPassword = "";

    function handleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        responseHandler(password);
        closeModal();
    }
</script>

<div
    class="flex w-1/2 max-w-xl flex-col overflow-hidden rounded-lg bg-white text-black"
>
    <div class="flex items-center justify-between p-2">
        <span class="w-6" />
        <span class="text-xl font-bold">
            Enter {extra.mode === "change" ? "new" : ""} password
        </span>
        <ModalIcon on:click={closeModal}>close</ModalIcon>
    </div>
    <div>
        <form class="space-y-4 p-4" on:submit={handleSubmit}>
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
                        (confirmPassword.length < 8 ||
                            password !== confirmPassword)
                            ? 'border-red-500'
                            : 'border-gray-400'}"
                        type="password"
                        minlength="8"
                        required
                        bind:value={confirmPassword}
                    />
                </div>
            </div>

            <button class="button button-blue" type="submit"
                >{extra.mode === "set"
                    ? "Set"
                    : extra.mode === "change"
                    ? "Change"
                    : "Done"}</button
            >
        </form>
    </div>
</div>

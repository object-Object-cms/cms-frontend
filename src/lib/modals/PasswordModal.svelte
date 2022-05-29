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
    class="themed-background themed-text flex w-1/2 max-w-xl flex-col overflow-hidden rounded-lg"
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

            <button class="button button-themed-primary" type="submit"
                >{extra.mode === "set"
                    ? "Set"
                    : extra.mode === "change"
                    ? "Change"
                    : "Done"}</button
            >
        </form>
    </div>
</div>

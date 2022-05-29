<script lang="ts" context="module">
    export interface Link {
        text: string;
        url: string;
    }
</script>

<script lang="ts">
    import { link } from "svelte-spa-router";
    import Icon from "./Icon.svelte";
    import { prefMenubarViewMode } from "./PreferencesController";
    import { currentAccount } from "../AccountManager";
    import { clampWithRollover } from "./utils";

    export let links: Link[];

    let expanded = false;
    let linkIndex = 0;
    let showMenubarAcceptors = false;
    let menubarCancel: () => void;
    let menubarAccept: () => void;

    function collapse() {
        expanded = false;
    }

    function toggleViewMode() {
        $prefMenubarViewMode = !$prefMenubarViewMode;
    }

    function prevLink() {
        linkIndex = clampWithRollover(0, links.length - 1, linkIndex - 1);
    }

    function nextLink() {
        linkIndex = clampWithRollover(0, links.length - 1, linkIndex + 1);
    }

    addEventListener("showMenubarAcceptors", (ev: CustomEvent) => {
        showMenubarAcceptors = true;
        menubarCancel = ev.detail.cancelHandler;
        menubarAccept = ev.detail.acceptHandler;
    });

    addEventListener("hideMenubarAcceptors", () => {
        showMenubarAcceptors = false;
        menubarCancel = undefined;
        menubarAccept = undefined;
    });
</script>

<header
    class="themed-box-secondary themed-font z-40 flex h-16 items-center p-2"
>
    {#if showMenubarAcceptors}
        <Icon on:click={menubarCancel} tooltip="Cancel">close</Icon>
    {/if}
    <div class="container mx-auto flex items-center">
        <details
            class="details-reset group peer mr-2 sm:hidden"
            bind:open={expanded}
        >
            <summary class="icon transition-transform group-open:rotate-90"
                ><span class="material-icons">menu</span></summary
            >
        </details>
        <a class="text-2xl sm:mr-4" href="/" use:link>CMS</a>
        <div
            class="themed-box-secondary invisible fixed left-0 top-16 right-0 bottom-0 z-30 flex min-w-0 flex-grow
                flex-col items-center peer-open:visible sm:visible sm:static sm:z-auto sm:flex-row"
        >
            {#if $prefMenubarViewMode}
                <div
                    class="flex flex-grow items-center justify-center space-x-4"
                >
                    <Icon tooltip="Show previous link" on:click={prevLink}>
                        arrow_back
                    </Icon>
                    {#each links as linkObj, i}
                        {#if linkObj.url.startsWith("/") && linkIndex === i}
                            <a
                                class="hover:underline"
                                href={linkObj.url}
                                use:link
                                on:click={collapse}
                            >
                                {linkObj.text}
                            </a>
                        {:else if linkIndex === i}
                            <a
                                class="hover:underline"
                                href={linkObj.url}
                                on:click={collapse}
                            >
                                {linkObj.text}
                            </a>
                        {/if}
                    {/each}
                    <Icon tooltip="Show next link" on:click={nextLink}>
                        arrow_forward
                    </Icon>
                </div>
            {:else}
                <ul
                    class="mb-2 flex w-full flex-col items-center space-y-2 overflow-auto
                        sm:mb-0 sm:mr-2 sm:flex-row sm:space-x-2 sm:space-y-0"
                >
                    {#each links as linkObj}
                        <li>
                            {#if linkObj.url.startsWith("/")}
                                <a
                                    class="hover:underline"
                                    href={linkObj.url}
                                    use:link
                                    on:click={collapse}
                                >
                                    {linkObj.text}
                                </a>
                            {:else}
                                <a
                                    class="hover:underline"
                                    href={linkObj.url}
                                    on:click={collapse}
                                >
                                    {linkObj.text}
                                </a>
                            {/if}
                        </li>
                    {/each}
                </ul>
            {/if}

            <div
                class="mt-auto mb-8 flex-shrink-0 space-x-2 sm:my-0 sm:ml-auto"
            >
                {#if $currentAccount}
                    <a
                        class="button button-themed-primary-outline flex items-center"
                        href="/profile"
                        use:link
                        on:click={collapse}
                    >
                        <span class="material-icons">person</span>
                        {$currentAccount.username}
                    </a>
                {:else}
                    <a
                        class="button button-themed-secondary-outline"
                        href="/login"
                        use:link
                        on:click={collapse}
                    >
                        Login
                    </a>
                    <a
                        class="button button-themed-primary-outline"
                        href="/register"
                        use:link
                        on:click={collapse}
                    >
                        Register
                    </a>
                {/if}
            </div>
        </div>

        <span class="ml-auto sm:ml-4">
            <Icon tooltip="Change view mode" on:click={toggleViewMode}>
                brightness_6
            </Icon>
        </span>
    </div>
    {#if showMenubarAcceptors}
        <Icon on:click={menubarAccept} tooltip="Accept">done</Icon>
    {/if}
</header>

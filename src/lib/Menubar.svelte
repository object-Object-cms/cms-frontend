<script lang="ts">
    import { link } from "svelte-spa-router";
    import Icon from "./Icon.svelte";

    interface Link {
        text: string;
        url: string;
    }

    export let links: Link[];

    let expanded = false;

    function collapse() {
        expanded = false;
    }
</script>

<header class="z-40 flex h-16 items-center bg-slate-200 p-2">
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
            class="fixed left-0 top-16 right-0 bottom-0 z-30 hidden min-w-0 flex-grow flex-col
                items-center bg-slate-200 peer-open:flex sm:static sm:flex sm:flex-row"
        >
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

            <div
                class="mt-auto mb-8 flex-shrink-0 space-x-2 sm:my-0 sm:ml-auto"
            >
                <a
                    class="button button-green-outline"
                    href="/login"
                    use:link
                    on:click={collapse}
                >
                    Login
                </a>
                <a
                    class="button button-blue-outline"
                    href="/register"
                    use:link
                    on:click={collapse}
                >
                    Register
                </a>
            </div>
        </div>

        <span class="ml-auto sm:ml-4">
            <Icon>brightness_6</Icon>
        </span>
    </div>
</header>

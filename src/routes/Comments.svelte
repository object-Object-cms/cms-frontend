<script lang="ts">
    import { currentAccount } from "../AccountManager";

    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import PageHeader from "../lib/PageHeader.svelte";

    interface Comment {
        author: string;
        content: string;
    }

    function loadComments(): Promise<Comment[]> {
        return fetch("dummydata/comments.json").then((resp) => resp.json());
    }

    let content = "";

    function postComment(ev: SubmitEvent) {
        ev.preventDefault();
        console.log("Posting comment:");
        console.log("content:", content);
        content = "";
    }
</script>

<PageHeader>Comments</PageHeader>

{#await loadComments()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then comments}
    <div class="container mx-auto p-2 space-y-2">
        {#if $currentAccount}
            <form
                class="bg-gray-300 mx-auto max-w-lg rounded-md p-2 space-y-2"
                on:submit={postComment}
            >
                <label class="block w-full">
                    Comment:
                    <textarea
                        class="w-full resize-none bg-gray-100 p-2 rounded"
                        required
                        bind:value={content}
                    />
                </label>
                <button class="button button-blue" type="submit">
                    Post comment
                </button>
            </form>
        {:else}
            <p class="text-red-600 text-center">
                You need to login to post a comment
            </p>
        {/if}

        {#each comments as comment}
            <div class="bg-slate-300 p-2 rounded">
                <p class="text-blue-600 font-bold">{comment.author}</p>
                <p>{comment.content}</p>
            </div>
        {/each}
    </div>
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load comments due to: {error}
    </p>
{/await}

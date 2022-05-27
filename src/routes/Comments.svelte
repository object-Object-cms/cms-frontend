<script lang="ts">
    import { currentAccount } from "../AccountManager";
    import { Comment, getComments, postComment } from "../Server";

    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import PageHeader from "../lib/PageHeader.svelte";

    let content = "";
    let comments: Comment[] = [];
    let posting = false;
    let error = "";

    async function loadComments(): Promise<Comment[]> {
        comments = await getComments();
        return comments;
    }

    async function handleSubmit(ev: SubmitEvent) {
        ev.preventDefault();
        if (posting) return;
        posting = true;
        error = "";
        const ccontent = content;
        content = "";
        try {
            await postComment(ccontent);
            try {
                await loadComments();
            } catch (err) {
                error = `Failed to refresh comments: ${err.message}`;
            }
        } catch (err) {
            error = `Failed to post comment: ${err.message}`;
        }
        posting = false;
    }
</script>

<PageHeader>Comments</PageHeader>

{#await loadComments()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then}
    <div class="container mx-auto p-2 space-y-2">
        {#if $currentAccount}
            <form
                class="bg-gray-300 mx-auto max-w-lg rounded-md p-2 space-y-2"
                on:submit={handleSubmit}
            >
                <label class="block w-full">
                    Comment:
                    <textarea
                        class="w-full resize-none bg-gray-100 p-2 mt-1 rounded"
                        required
                        bind:value={content}
                    />
                </label>
                <button
                    class="button button-blue"
                    type="submit"
                    disabled={posting}
                >
                    {#if posting}
                        <LoadIndicator />
                    {:else}
                        Post comment
                    {/if}
                </button>
                {#if error}
                    <p class="text-red-600">{error}</p>
                {/if}
            </form>
        {:else}
            <p class="text-red-600 text-center">
                You need to login to post a comment
            </p>
        {/if}

        {#if comments.length > 0}
            <div class="flex flex-col-reverse gap-2">
                {#each comments as comment}
                    <div class="bg-slate-300 p-2 rounded">
                        <p
                            class="{comment.username
                                ? 'text-blue-600'
                                : 'text-red-600'} font-bold"
                        >
                            {comment.username ?? "Deleted User"}
                        </p>
                        <p class="whitespace-pre-wrap">{comment.content}</p>
                    </div>
                {/each}
            </div>
        {:else}
            <p class="text-center">No comments yet</p>
        {/if}
    </div>
{:catch error}
    <p class="container mx-auto text-red-600 text-center">
        Failed to load comments due to: {error}
    </p>
{/await}

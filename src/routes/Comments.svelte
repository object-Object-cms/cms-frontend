<script lang="ts">
    import LoadIndicator from "../lib/LoadIndicator.svelte";
    import PageHeader from "../lib/PageHeader.svelte";

    interface Comment {
        author: string;
        content: string;
    }

    function loadComments(): Promise<Comment[]> {
        return fetch("dummydata/comments.json").then((resp) => resp.json());
    }

    let author = "";
    let content = "";

    function postComment(ev: SubmitEvent) {
        ev.preventDefault();
        if (author !== "" && content !== "") {
            console.log("Posting comment:");
            console.log("author:", author);
            console.log("content:", content);
            author = "";
            content = "";
        } else {
            alert("Please enter your name and a comment");
        }
    }
</script>

<PageHeader>Comments</PageHeader>

{#await loadComments()}
    <div class="p-8">
        <LoadIndicator />
    </div>
{:then comments}
    <div class="container mx-auto p-2 space-y-2">
        <form
            class="bg-gray-300 mx-auto max-w-lg rounded-md p-2 space-y-2"
            on:submit={postComment}
        >
            <label class="block w-full">
                Name:
                <input
                    class="w-full bg-gray-100 p-2 rounded"
                    type="text"
                    required
                    bind:value={author}
                />
            </label>
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

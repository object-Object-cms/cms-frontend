<script lang="ts">
    interface ArticleParameters {
        id: string;
    }

    export let params: ArticleParameters;
</script>

<p>article: {params.id}</p>

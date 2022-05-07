<script lang="ts">
    import { getImageUrl } from "./utils";

    export let image: string;
    export let alt: string;
</script>

<img class="max-h-full" src={getImageUrl(image)} {alt} />

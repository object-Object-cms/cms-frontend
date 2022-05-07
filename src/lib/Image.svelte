<script lang="ts">
    import { getImageUrl } from "./utils";

    export let image: string;
    export let alt: string;
</script>

<img src={getImageUrl(image)} {alt} />

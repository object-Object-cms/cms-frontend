<script lang="ts">
    import { getImageUrl } from "./utils";

    export let image: string;
    export let alt: string;
</script>

<img class="h-full w-full object-contain" src={getImageUrl(image)} {alt} />

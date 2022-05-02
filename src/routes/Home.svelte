<script lang="ts">
    import Slider from "../lib/Slider.svelte";
</script>

<Slider
    slides={[
        {
            title: "A slide",
            description: "This is a cool slide",
            imageUrl: "dummydata/a.png",
            textColor: "white"
        },
        {
            title: "More than one",
            description: "Yes there can be more than one slide",
            imageUrl: "dummydata/b.png",
            textColor: "white"
        },
        {
            title: "Wraps around",
            description: "After this slide you should see the first one again",
            imageUrl: "dummydata/c.png",
            textColor: "white"
        }
    ]}
    cycleTime={5000}
/>

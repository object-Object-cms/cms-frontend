<script lang="ts">
    import SliderArrow from "./SliderArrow.svelte";
    import { clampWithRollover, getImageUrl } from "./utils";

    interface Slide {
        title: string;
        description: string;
        image: string;
        textColor: "white" | "black";
    }

    export let slides: Slide[];
    export let cycleTime = 3000;

    let slideIndex = 0;

    function prevSlide() {
        slideIndex = clampWithRollover(0, slides.length - 1, slideIndex - 1);
    }

    function nextSlide() {
        slideIndex = clampWithRollover(0, slides.length - 1, slideIndex + 1);
    }

    let cycleInterval: number | undefined;

    function startCycleTimer() {
        clearInterval(cycleInterval);
        cycleInterval = setInterval(nextSlide, cycleTime);
    }

    function stopCycleTimer() {
        clearInterval(cycleInterval);
    }

    function showSlide(index: number) {
        if (index >= 0 && index < slides.length) {
            slideIndex = index;
        }
    }

    $: startCycleTimer(), cycleTime;
</script>

<div
    class="relative h-full w-full select-none overflow-hidden"
    on:mouseenter={stopCycleTimer}
    on:mouseleave={startCycleTimer}
>
    <div
        class="flex h-full w-full transition-transform duration-300"
        style="transform: translate({-100 * slideIndex}%);"
    >
        {#each slides as slide}
            <div
                class="relative h-full min-w-full
                    {slide.textColor === 'white' ? 'bg-black' : 'bg-white'}"
            >
                <img
                    class="w-full"
                    src={getImageUrl(slide.image)}
                    alt="{slide.title} slide image"
                />
                <div
                    class="absolute left-1/2 bottom-8 max-w-sm -translate-x-1/2 text-center
                        {slide.textColor === 'white'
                        ? 'text-white'
                        : 'text-black'}"
                >
                    <p class="text-xl">{slide.title}</p>
                    <p>{slide.description}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="absolute left-1/2 bottom-4 flex -translate-x-1/2 space-x-4">
        {#each slides as _slide, i}
            <div
                class="h-2 w-8 cursor-pointer rounded-sm transition-colors
                    {slideIndex === i ? 'bg-opacity-75' : 'bg-opacity-20'}
                    {slides[slideIndex]?.textColor === 'white'
                    ? 'bg-white'
                    : 'bg-black'}"
                on:click={() => showSlide(i)}
            />
        {/each}
    </div>

    <SliderArrow
        color={slides[slideIndex]?.textColor}
        direction="left"
        on:click={prevSlide}
    />
    <SliderArrow
        color={slides[slideIndex]?.textColor}
        direction="right"
        on:click={nextSlide}
    />
</div>

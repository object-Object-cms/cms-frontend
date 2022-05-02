<script lang="ts">
    interface Slide {
        title: string;
        description: string;
        imageUrl: string;
        textColor: "white" | "black";
    }

    export let slides: Slide[];
    export let cycleTime = 3000;

    let slide = 0;

    function clampWithRollover(min, max, value) {
        return value > max ? min : value < min ? max : value;
    }

    function prevSlide() {
        slide = clampWithRollover(0, slides.length - 1, slide - 1);
    }

    function nextSlide() {
        slide = clampWithRollover(0, slides.length - 1, slide + 1);
    }

    let cycleInterval: number | undefined;

    function startCycleTimer() {
        clearInterval(cycleInterval);
        cycleInterval = setInterval(nextSlide, cycleTime);
    }

    function stopCycleTimer() {
        clearInterval(cycleInterval);
    }

    startCycleTimer();
</script>

<div
    class="w-full overflow-hidden"
    on:mouseenter={stopCycleTimer}
    on:mouseleave={startCycleTimer}
>
    <div
        class="flex w-full items-start transition-transform duration-300"
        style="transform: translate({-100 * slide}%);"
    >
        {#each slides as slide}
            <div class="relative min-w-full">
                <img
                    class="w-full"
                    src={slide.imageUrl}
                    alt="{slide.title} slide image"
                />
                <div
                    class="absolute left-1/2 bottom-4 -translate-x-1/2 text-center
                        {slide.textColor === 'black'
                        ? 'text-black'
                        : 'text-white'}"
                >
                    <p class="text-xl">{slide.title}</p>
                    <p>{slide.description}</p>
                </div>
            </div>
        {/each}
    </div>
</div>

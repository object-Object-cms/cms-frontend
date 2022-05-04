<script lang="ts">
    import type { ComplexValue } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";

    export let value: any;
    export let proto: ComplexValue;
</script>

<div class="pl-4">
    {#each Object.entries(proto) as [name, typee]}
        <p>
            {name}:
            {#if Array.isArray(typee)}
                <!--Either choice or complex-->
                {#if typeof typee[0] === "string"}
                    <select bind:value={value[name]}>
                        {#each typee as opt}
                            <option>{opt}</option>
                        {/each}
                    </select>
                {:else}
                    {#each value[name] as entry}
                        <ComplexValueEdit proto={typee[0]} bind:value={entry} />
                    {/each}
                    <button
                        on:click={() =>
                            (value[name] = [
                                ...value[name],
                                JSON.parse(JSON.stringify(typee[0]))
                            ])}>Add</button
                    >
                {/if}
            {:else if typeof typee === "string"}
                <input type="text" bind:value={value[name]} />
            {:else if typeof typee === "number"}
                <input type="number" bind:value={value[name]} />
            {:else if typeof typee === "boolean"}
                <input type="checkbox" bind:checked={value[name]} />
            {/if}
        </p>
    {/each}
</div>

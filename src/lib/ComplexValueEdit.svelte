<script lang="ts">
    import { ComplexValue, NonstandardValue } from "./components";
    import ComplexValueEdit from "./ComplexValueEdit.svelte";
    import SimpleValueEdit from "./SimpleValueEdit.svelte";
    import ListElementEditHeaderButton from "./ListElementEditHeaderButton.svelte";
    import ImageValueEdit from "./ImageValueEdit.svelte";
    import ReflowHintValueEdit from "./ReflowHintValueEdit.svelte";

    export let value: any;
    export let proto: ComplexValue;
</script>

<div class="divide-y divide-slate-600 border border-slate-600">
    {#each Object.entries(proto) as [name, typee]}
        <div class="flex divide-x divide-slate-600">
            {#if Array.isArray(typee)}
                <!--Either choice or complex-->
                {#if typeof typee[0] === "string"}
                    <SimpleValueEdit
                        {name}
                        bind:value={value[name]}
                        type="dropdown"
                    >
                        {#each typee as opt}
                            <option>{opt}</option>
                        {/each}
                    </SimpleValueEdit>
                {:else}
                    <div class="w-full">
                        {#each value[name] as entry, i}
                            <div
                                class="bg-slate-600 pl-2 flex items-center justify-between"
                            >
                                {name}[{i}]
                                <ListElementEditHeaderButton
                                    on:click={() => {
                                        value[name] = value[name].filter(
                                            (e) => e !== entry
                                        );
                                    }}
                                >
                                    remove
                                </ListElementEditHeaderButton>
                            </div>
                            <ComplexValueEdit
                                proto={typee[0]}
                                bind:value={entry}
                            />
                        {/each}
                        <div
                            class="bg-slate-600 pl-2 flex items-center justify-between"
                        >
                            {name}
                            <ListElementEditHeaderButton
                                on:click={() => {
                                    value[name] = [
                                        ...value[name],
                                        JSON.parse(JSON.stringify(typee[0]))
                                    ];
                                }}>add</ListElementEditHeaderButton
                            >
                        </div>
                        <!-- <button
                            on:click={() =>
                                (value[name] = [
                                    ...value[name],
                                    JSON.parse(JSON.stringify(typee[0]))
                                ])}>Add</button
                        > -->
                    </div>
                {/if}
            {:else if typeof typee === "string"}
                <SimpleValueEdit {name} bind:value={value[name]} type="text" />
            {:else if typeof typee === "number"}
                <SimpleValueEdit
                    {name}
                    bind:value={value[name]}
                    type="number"
                />
            {:else if typeof typee === "boolean"}
                <SimpleValueEdit
                    {name}
                    bind:value={value[name]}
                    type="checkbox"
                />
            {:else if typee instanceof NonstandardValue}
                {#if typee._type === "image"}
                    <ImageValueEdit
                        name={typee.overrideName || name}
                        bind:value={value[name]}
                    />
                {:else if typee._type === "reflowhint"}
                    <ReflowHintValueEdit
                        name={typee.overrideName || name}
                        bind:value={value[name]}
                    />
                {/if}
            {/if}
        </div>
    {/each}
</div>

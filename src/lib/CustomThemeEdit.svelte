<script lang="ts">
    import type { ThemeVariables } from "./themes";

    export let themeVariables: Partial<ThemeVariables>;
</script>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 select-none text-gray-600">
        wallpaper
    </span>
    <div class="group flex flex-grow flex-col">
        <span class="text-xs text-gray-600 group-focus-within:text-blue-600">
            Background color
        </span>
        <div class="flex">
            <input
                class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                type="text"
                required
                bind:value={themeVariables.backgroundColor}
            />
            <input type="color" bind:value={themeVariables.backgroundColor} />
        </div>
    </div>
</div>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 select-none text-gray-600">
        border_color
    </span>
    <div class="group flex flex-grow flex-col">
        <span class="text-xs text-gray-600 group-focus-within:text-blue-600">
            Text color
        </span>
        <div class="flex">
            <input
                class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                type="text"
                required
                bind:value={themeVariables.textColor}
            />
            <input type="color" bind:value={themeVariables.textColor} />
        </div>
    </div>
</div>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 select-none text-gray-600">
        link
    </span>
    <div class="group flex flex-grow flex-col">
        <span class="text-xs text-gray-600 group-focus-within:text-blue-600">
            Link color
        </span>
        <div class="flex">
            <input
                class="w-full border-b-2 border-gray-400 p-1 outline-none focus:border-blue-600"
                type="text"
                required
                bind:value={themeVariables.linkColor}
            />
            <input type="color" bind:value={themeVariables.linkColor} />
        </div>
    </div>
</div>

<div class="flex items-end space-x-2">
    <span class="material-icons-outlined md-36 select-none text-gray-600">
        text_fields
    </span>
    <div class="group flex flex-grow flex-col">
        <span class="text-xs text-gray-600 group-focus-within:text-blue-600">
            Font style
        </span>
        <select bind:value={themeVariables.fontFamily}>
            <option value="sans-serif">Sans serif</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="cursive">Cursive</option>
            <option value="fantasy">Fantasy</option>
        </select>
    </div>
</div>

<script lang="ts">
    export let name: string;
    export let value: any;
</script>

<div class="w-1/3 overflow-hidden pl-2 hover:overflow-visible">
    <div class="relative z-50 w-max hover:bg-slate-500">
        {name}
    </div>
</div>
<div class="flex w-2/3 items-center">
    <select class="w-full bg-transparent outline-none" bind:value>
        <option value="keep_height">Keep height</option>
        <option value="keep_aspect">Keep aspect ratio</option>
        <option value="keep_area">Keep area</option>
    </select>
</div>

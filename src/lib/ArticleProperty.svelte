<script lang="ts">
    export let icon: string;
</script>

<p class="flex items-center space-x-1 text-sm text-gray-500">
    <span class="material-icons md-18 select-none">{icon}</span>
    <span><slot /></span>
</p>

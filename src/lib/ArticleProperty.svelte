<script lang="ts">
    export let icon: string;
</script>

<p class="themed-dim-text flex items-center space-x-1 text-sm">
    <span class="material-icons md-18 select-none">{icon}</span>
    <span><slot /></span>
</p>

<div class="fixed flex h-full w-full items-center justify-center">
    <span class="animate-reverse-spin material-icons">sync</span>
</div>

<style>
    @keyframes spin {
        to {
            transform: rotate(-360deg);
        }
    }
    .animate-reverse-spin {
        animation: spin 1s linear infinite;
    }
</style>

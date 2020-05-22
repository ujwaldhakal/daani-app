<script>
export let visibility;
</script>

{#if visibility}
<div class="spinner-border" role="status">
  <span >Loading...</span>
</div>
{/if}

<script>
export let visibility;
</script>

{#if visibility}
<div class="spinner-border" role="status">
  <img src="../assets/img/icons/loader.gif" width="30px" style="width: 30px !important;">
</div>
{/if}

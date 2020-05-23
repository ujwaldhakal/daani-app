<script>
  export let message;
</script>

<style>
  .error-text{
    text-align: left;
    color: #dc3545;
  }
</style>
{#if message !== '' }
  <small id="email" class="form-text error-text">{message}</small>
{/if}

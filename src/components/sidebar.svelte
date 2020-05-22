
<script>
  import {loadCategories} from './../entity/product'
  import {onMount} from 'svelte'
  let categories = [];
  onMount( async () => {

    try {
      categories = await loadCategories()
    } catch (e) {
      console.log(e);
    }
  })
</script>

<style lang="scss">
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .icon-img{
    width: 30px;
  }

  @import '../assets/scss/base/common';
</style>
<aside class="sidebar bg-white p-3">
  <h4 class="title-3 mb-3"><span class="color-theme">Categories</span> </h4>
  <ul class="list-style-none list-margin">
    {#each categories as category}
      {#if category.parent_id === 0}
      <li><a href="#">{category.name} <span>(3)</span></a></li>
        {/if}
    {/each}
  </ul>
  <form>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search">
      <button type="submit" class="btn btn-success radius-0">Submit</button>
    </div>
  </form>
</aside>


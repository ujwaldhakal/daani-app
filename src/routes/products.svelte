<script>
  export let posts;
  import Sidebar from './../components/sidebar.svelte'
  import PublicLayout from './../layout/public.svelte'
  import ProductBox from './../components/dashboard/products/single-box.svelte'
  import {onMount} from 'svelte'
  import {loadCategories,loadAllPublicProducts} from './../entity/product'

  let categories = [];

  let currentPage = 1
  let filter = {
    latest: true
  }
  let products = [];
  let paginator = [];
  let searchQuery = '';
  let showLoader = true


  onMount( async () => {

    loadProducts();

    try {
      categories = await loadCategories()
    } catch (e) {
      console.log(e);
    }
  })


  const loadProducts = async () => {
    try {
      let res = await loadAllPublicProducts(currentPage, filter);
      showLoader = false;
      if (!res.errors) {
        products = products.concat(res.data);
        paginator = res.paginatorInfo
      }

    } catch (e) {

      console.log(e);
    }
  }

  const loadMore = async () => {
    showLoader = true;
    currentPage++;
    await loadProducts();
  }

  const search = async () => {
    products = [];
    paginator = [];
    currentPage = 1;


    await loadProducts();
  }


  const searchByCat = async (id) => {
    showLoader = true;
    filter.catId =  id;
    await search();
  }

  const searchByName = async () => {
    showLoader = true;
    console.log("did we get query",searchQuery);
    filter.search =  searchQuery
    await search();
  }
</script>

<style lang="scss">
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }

  @import '../assets/scss/base/common';
</style>

<svelte:head>
  <title>Take products for free !</title>
</svelte:head>
<PublicLayout>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3 col-sm-12">
        <aside class="sidebar bg-white p-3">
          <h4 class="title-3 mb-3">
            <span class="color-theme">Categories</span>
          </h4>

          <ul class="list-style-none list-margin">
            {#each categories as category}
              {#if category.parent_id === 0}
                <li style="cursor:pointer"><a on:click={() => searchByCat(category.id)}>{category.name}</a></li>
              {/if}
            {/each}
          </ul>

          <form>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Search" bind:value={searchQuery}>
              <button type="button" on:click={searchByName} class="btn btn-success radius-0">Submit</button>
            </div>
          </form>
        </aside>
      </div>
      <div class="col-md-8 col-sm-12">
        <h4 class="title-4 bg_border bg_border--grey">Products List</h4>
        <div class="row">
          {#each products as product}
            <ProductBox details={product} layout="products-list"/>
          {/each}
        </div>

        {#if showLoader}
          <div class="loader text-center w-100">
            <img src="../assets/img/icons/loader.gif">
            Please wait while we load products
          </div>
        {/if}

        {#if !showLoader && products.length == 0}
        <div class="loader text-center w-100">
          <span>Sorry there are no products</span>
        </div>
        {/if}

      </div>

      {#if paginator &&  currentPage < paginator.lastPage }
        <div class="col-md-12">
          <div class="text-center">
            <button class="radius-100 btn btn-success" on:click={loadMore}>Load More</button>
          </div>
        </div>
      {/if}


    </div>

  </div>
</PublicLayout>

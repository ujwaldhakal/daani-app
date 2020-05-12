<script>
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import {loadAllPublicProducts} from './../entity/product'
  import {onMount} from 'svelte';
  import ProductBox from './../components/dashboard/products/single-box.svelte'


  let currentPage = 1
  let filter = {
    latest: true
  }
  let products = [];
  let paginator = [];
  let searchQuery = '';
  onMount(async () => {
    await loadProducts();
  })


  const loadProducts = async () => {
    try {
      let res = await loadAllPublicProducts(currentPage, filter);
      if (!res.errors) {
        products = products.concat(res.data);
        paginator = res.paginatorInfo
      }

    } catch (e) {

    }
  }

  const loadMore = async () => {
    currentPage++;
    await loadProducts();
  }

  const search = async () => {
    products = [];
    paginator = [];
    filter = {
      latest: true,
      search: searchQuery
    }

    await loadProducts();
  }
</script>
<style lang="scss">
  .test{
    background-color: red;
  }
</style>

<div class="container test">
  <Header/>
  <h1>
    One man's trash is another's man treasure
  </h1>

  <div class="search-input">
    <input type="text" placeholder="What are you looking" bind:value={searchQuery}>
    <button on:click={search}>Search</button>
  </div>


  <div class="latest-products">
    <div class="row">
      {#each products as product}
        <div class="col-sm-4">
          <ProductBox name="{product.name}" slug="{product.slug}"/>
        </div>
      {/each}
      {#if paginator &&  currentPage < paginator.lastPage }
        <button class="btn" on:click={loadMore}> Load More</button>
      {/if}
    </div>
  </div>
  <Footer/>
</div>

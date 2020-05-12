<script>
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import {loadAllPublicProducts} from './../entity/product'
  import {onMount} from 'svelte';
  import ProductBox from './../components/dashboard/products/single-box.svelte'
  import PublicLayout from './../layout/public.svelte'

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
    currentPage = 1;
    filter = {
      latest: true,
      search: searchQuery
    }

    await loadProducts();
  }
</script>
<div class="top-header">
  <Header/>
  <div class="container">
    <div class="centered top-25">
      <h1 class="title-1 pb-3">
        One man's <span>Trash</span> is <br/>another's man <span class="title-underline title-up">Treasure</span>
      </h1>
      <div class="search-box d-flex justify-content-around radius-100">
        <input type="text" placeholder="What are you looking" bind:value={searchQuery}>
        <input type="text" placeholder="Where">
        <button on:click={search} class="btn-link btn-style-1">Search</button>
      </div>
    </div>
  </div>
</div>
<div class="container">
  <div class="latest-products row my-5">
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul>
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span> Apple iMac 21.5-inch | 1.6GHz..
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <button class="btn btn-light">Learn More</button>
          </span>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <div class="text-center">
        <button class="radius-100 btn btn-success">Load More</button>
      </div>

    </div>
    <!-- <div class="row">
      {#each products as product}
        <div class="col-sm-4">
          <ProductBox name="{product.name}" slug="{product.slug}"/>
        </div>
      {/each}
      {#if paginator &&  currentPage < paginator.lastPage }
        <button class="btn" on:click={loadMore}> Load More</button>
      {/if}
    </div> -->
  </div>
  <Footer/>
</div>
<style lang="scss">
  @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/header';

  .search-box{
    background-color: white;
    padding:15px;
    border: 6px solid green;
    input{
      min-width: 150px;
      border: none;
      border-bottom: 1px solid #cacaca;
    }
  }
  .footer{
    color: grey;
    font-size: 11px;
    border-top: 1px solid grey;
    padding: 25px;
    span{
        color: blue;
    }
  }
</style>



<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<script>
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import {loadAllPublicProducts} from './../entity/product'
  import {onMount} from 'svelte';
  import ProductBox from './../components/dashboard/products/single-box.svelte'
  import PublicLayout from './../layout/public.svelte'
  import Loader from './../components/utils/loader/general.svelte'

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
        console.log('data', this.products)
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

    if(searchQuery !== '') {
      await loadProducts();
    }
  }
</script>
<style lang="scss">
  @import '../assets/scss/base/main';
  @import '../../src/assets/scss/base/components/search';
  @import '../../src/assets/scss/base/components/header';
  // .search-box{
  //   background-color: white;
  //   padding:15px;
  //   border: 6px solid green;
  //   input{
  //     min-width: 150px;
  //     border: none;
  //     border-bottom: 1px solid #cacaca;
  //     &:focus{
  //       border-bottom: 1px solid $color-primary !important;

  //     }
  //   }
  // }
  .footer{
    color: grey;
    font-size: 11px;
    border-top: 1px solid grey;
    padding: 25px;

    span {
      color: blue;
    }
  }
</style>

<svelte:head>
  <title>Donate your items</title>
</svelte:head>
<div class="top-header">
  <Header/>
  <div class="container">
    <div class="centered pt-3 pt-md-5">
      <h1 class="title-1 pb-3">
        One person's <span>Trash</span> is <br/>another person's <span class="title-underline title-up">Treasure</span>
      </h1>
      <div class="search-box d-md-flex justify-content-between radius-md-100">
        <input type="text" placeholder="What are you looking" bind:value={searchQuery}>
        <!--        <input type="text" placeholder="Where">-->
        <button on:click={search} class="btn btn-outline-primary ml-md-3">Search</button>
      </div>
    </div>
  </div>
</div>
<div class="container">
  <div class="latest-products row my-3 my-md-5">
    {#each products as product}
      <ProductBox details={product} layout="home"/>
    {/each}
    {#if products.length == 0}
      <div class="loader text-center w-100">
        <img src="../assets/img/icons/loader.gif">
        Please wait while we load products
      </div>
    {/if}
    {#if paginator &&  currentPage < paginator.lastPage }
      <div class="col-md-12">
        <div class="text-center">
          <button class="radius-100 btn btn-success" on:click={loadMore}>Load More</button>
        </div>
      </div>
    {/if}

  </div>
  <Footer/>
</div>




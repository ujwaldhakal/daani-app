<script>
  import {stores} from '@sapper/app';
  import {loadAllPublicProducts} from './../../entity/product'
  import PublicLayout from './../../layout/public.svelte'
  import Header from './../../components/header.svelte'
  import Loader from './../../components/utils/loader/general.svelte'

  const {page} = stores();
  import {onMount} from 'svelte';
  import Carousel from '@beyonk/svelte-carousel'

  let slug = $page.params.slug;
  let filter = {
    slug: slug
  }
  let currentPage = 1;

  let product = {};
  onMount(async () => {
    const res = await loadAllPublicProducts(1, filter, `user{name,address,phone_number,email,created_at}`);
    if (!res.error) {
      product = res.data[0];
    }
  })
</script>
<style lang="scss">
  @import '../../assets/scss/base/common';
</style>

<svelte:head>
  <title>{ slug }</title>
</svelte:head>

<PublicLayout>

  <div class="container">

    {#if !product.id}
      <div class="loader text-center w-100">
        <img src="../assets/img/icons/loader.gif">
        Please wait while we load products
      </div>
    {/if}

    {#if product.id}
      <div class="row py-5">
        <div class="col-md-8 col-sm-12">
          <Carousel perPage={{ 800: 1, 500: 1 }} autoplay={5000}>
            <div class="slide-content">
              <img src="//placekitten.com/600" alt="Kitten 1"/>
            </div>
            <div class="slide-content">
              <img src="//placekitten.com/601" alt="Kitten 1"/>
            </div>
            <div class="slide-content">
              <img src="//placekitten.com/602" alt="Kitten 1"/>
            </div>
            <div class="slide-content">
              <img src="//placekitten.com/603" alt="Kitten 1"/>
            </div>
          </Carousel>
          <div class="product-detail border-2 p-3 mb-3">
            <h4 class="title-4">Description</h4>
            {product.description}
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="post widget">
            <h4 class="title-4 title-bold">Posted By :</h4>
            <div class="media">
              <figure class="has-circle img-wrap mr-2" style="background-image:url('../assets/img/great-success.png')">
              </figure>
              <div class="media-body">
                <h5 class="mt-0 title-5">{product.user.name}</h5>
                <p class="title-sm">Member Since {(new Date(product.user.created_at)).toDateString()}</p>
<!--                <button class="btn btn-success">Contact for pickup</button>-->
              </div>
            </div>
          </div>
          <div class="post widget">
            {#if product.user.phone_number}
            <h4 class="title-4 title-bold">Contact Number : {product.user.phone_number}</h4>
              {/if}
      {#if product.user.email}
            <h4 class="title-4 title-bold">Email :{product.user.email} </h4>
        {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</PublicLayout>


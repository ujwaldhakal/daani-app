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
           {#if product.media.length > 0}
          <Carousel perPage={{ 800: 1, 500: 1 }} autoplay={5000}>
             {#each product.media as media}
            <div class="slide-content">
              <img src="{media.path}" alt="Kitten 1"/>
            </div>
<!--                        <div class="slide-content">-->
<!--              <img src="https://images.ctfassets.net/hrltx12pl8hq/5596z2BCR9KmT1KeRBrOQa/4070fd4e2f1a13f71c2c46afeb18e41c/shutterstock_451077043-hero1.jpg" alt="Kitten 1"/>-->
<!--            </div>-->
<!--                        <div class="slide-content">-->
<!--              <img src="https://as.ftcdn.net/r/v1/pics/dec60d7bc0ac33b1bbdcca0522c44d5b7149395c/home/discover_collections/20AprNew/image-2020-03-27-15-06-21-252.jpg" alt="Kitten 1"/>-->
<!--            </div>-->

               {/each}
          </Carousel>
             {/if}
          <div class="product-detail border-2 p-3 mb-3">
            <h4 class="title-4">Description</h4>
            {product.description}
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="post widget">
            <h4 class="title-4 title-bold">Posted By :</h4>
            <div class="media">
              <figure class="has-circle mr-2" style="background-image:url('../assets/img/avatar.png')">
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
            <div class="user-info">
            <span class="title-4 ">Contact Number : </span> <a href="tel:{product.user.phone_number}">{product.user.phone_number}</a>
            </div>
              {/if}

            {#if product.user.email}
            <div class="user-info">
            <span class="title-4 ">Email : </span> <a href="mailto:{product.user.email}">{product.user.email}</a>
            </div>
              {/if}

            {#if product.user.address}
            <div class="user-info">
            <span class="title-4 ">Address :</span> {product.user.address}
            </div>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  </div>
</PublicLayout>


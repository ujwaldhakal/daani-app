<script>
  import {stores} from '@sapper/app';
  import {loadAllPublicProducts} from './../../entity/product'
  import PublicLayout from './../../layout/public.svelte'
  import Header from  './../../components/header.svelte'

  const {page} = stores();
  import {onMount} from 'svelte';

  let slug = $page.params.slug;
  let filter = {
    slug: slug
  }
  let currentPage = 1;

  let product = {};
  onMount(async () => {
    const res = await loadAllPublicProducts(1,filter);
    if(!res.error) {
      product = res.data[0];
    }
  })
</script>
<style lang="scss">
  @import '../../assets/scss/base/common';
</style>


<PublicLayout>
  <div class="container">
    <div class="row py-5">
      <div class="col-md-8 col-sm-12">
        <figure class="banner-product">
          <img src="../assets/img/product-img.jpg"  alt="Banner">
        </figure>
        <div class="product-detail border-2 p-3 mb-3">
          <h4 class="title-4">Details</h4>
          <p>Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words </p>
          <h4 class="title-4">Desscription</h4>
          <ul class="title-sm list-style-none">
            <li>iMac 21.5-inch</li>
            <li>Turbo Boost up to 2.7GHz</li>
            <li>1TB hard drive</li>
            <li>Turbo Boost up to 2.7GHz</li>
            <li>Intel HD Graphics 6000</li>
            <li>Turbo Boost up to 2.7GHz</li>
          </ul>
        </div>
      </div>
      <div class="col-md-4 col-sm-12">
        <div class="post widget">
          <h4 class="title-4 title-bold">Posted By :</h4>
          <div class="media">
            <figure class="has-circle img-wrap mr-2" style="background-image:url('../assets/img/great-success.png')">
            </figure>
            <div class="media-body">
              <h5 class="mt-0 title-5">Ujwal Dhakal</h5>
              <p class="title-sm">Member Since 2 months</p>
              <button class="btn btn-success">Contact for pickup</button>
            </div>
          </div>
        </div>
        <div class="post widget">
          <h4 class="title-4 title-bold">Pickup Location :</h4>
        </div>
      </div>
    </div>
  </div>
</PublicLayout>


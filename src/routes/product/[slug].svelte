<script>
  import {stores} from '@sapper/app';
  import {loadAllPublicProducts} from './../../entity/product'

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
<h1>
  Product Name  : {product.name}
</h1>

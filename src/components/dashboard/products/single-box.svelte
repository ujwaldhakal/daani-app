<script>
  export let details
  export let layout

  let featuredImage = false;

  details.media.map((item) => {

    if(item.category === 'cover_image') {
      featuredImage = item.path;
    }
  })



  function limitString(str, maxLen, separator = ' ') {
    if (str.length <= maxLen) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLen));
  }
</script>

<style lang="scss">
  @import '../../../assets/scss/base/main';
</style>

{#if layout === 'products-list'}
<div class="col-md-4">
  <div class="border box-wrapper">
    <figure class="img-wrap img-wrap-150 mr-3 mb-0">
      <img src={featuredImage} alt="Jackets" class="block-absolute">
    </figure>
    <div class="bg-white p-3">
      <h5 class="mt-0 title-5 title-bold">{details.name}</h5>
      <p class="title-sm">
        {limitString(details.description,100,'')}
      </p>
      <a class="btn btn-outline-success btn-sm" href="product/{details.slug}">See Details</a>
    </div>
  </div>
</div>
{/if}


{#if layout === 'home'}
<div class="col-lg-4 col-md-6">
  <div class="box-wrapper" >
    <figure class="img-wrap" style="background-image:url('{featuredImage}'); background-size:cover"></figure>
    <div class="hover-content d-flex align-items-end p-3">
      <span>{details.name}
        <p>{limitString(details.description,100,'')}</p>
        <a rel=prefetch href="product/{details.slug}" class="btn btn-light">View Details</a>
      </span>
    </div>
  </div>
</div>
{/if}

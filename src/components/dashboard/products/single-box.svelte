<script>
  export let details

  let featuredImage = false;

  details.media.map((item) => {

    if(item.category === 'cover_image') {
      featuredImage = item.path;
    }
  })
</script>

<style lang="scss">
  @import '../../../assets/scss/base/main';
</style>

<div class="col-md-4">
      <div class="box-wrapper" style="background-image:url('{featuredImage}'); background-size:cover">
        <div class="hover-content d-flex align-items-end p-3">
          <span>{details.name}
            <p>{details.description}</p>
            <a rel=prefetch href="product/{details.slug}" class="btn btn-light">View Details</a>
          </span>
        </div>
      </div>
</div>

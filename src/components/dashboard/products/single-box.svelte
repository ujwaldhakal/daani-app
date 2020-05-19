<script>
  export let name
  export let slug
</script>

<style lang="scss">
  @import '../../../assets/scss/base/main';
</style>

<div class="col-md-4">
      <div class="box-wrapper">
        <div class="hover-content d-flex align-items-end p-3">
          <span>{name}
            <ul class="list-style-none title-sm">
              <li>iMac 21.5-inch</li>
              <li>1.6GHz dual-core intel Core i5 processor</li>
              <li>Turbo Boost up to 2.7GHZ</li>
            </ul>
            <a rel=prefetch href="product/{slug}" class="btn btn-light">View Details</a>
          </span>
        </div>
      </div>
</div>

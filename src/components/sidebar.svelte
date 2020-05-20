<!-- <script>
  import CategoryIcon from './../components/utils/icons/category.svelte'
</script> -->
<style lang="scss">
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
  .icon-img{
    width: 30px;
  }

  @import '../assets/scss/base/common';
</style>
<aside class="sidebar bg-white p-3">
  <h4 class="title-3 mb-3"><span class="color-theme">Categories</span> </h4>
  <ul class="list-style-none list-margin">
    <li><a href="#">Automobiles <span>(3)</span></a></li>
    <li><a href="#">Computer <span>(10)</span></a></li>
    <li><a href="#">Electronics <span>(7)</span></a></li>
    <li><a href="#">Mobile & accessories <span>(14)</span></a></li>
    <li><a href="#">Real Estate <span>(2)</span></a></li>
  </ul>
  <form>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search">
      <button type="submit" class="btn btn-success radius-0">Submit</button>
    </div>
  </form>
</aside>


<script>
  export let posts;
  import Sidebar from './../components/sidebar.svelte'
  import PublicLayout from './../layout/public.svelte'
  // import CategoryIcon from './../components/utils/icons/category.svelte'

</script>

<style lang="scss">
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }

  @import '../assets/scss/base/common';
</style>

<PublicLayout>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3 col-sm-12">
        <Sidebar></Sidebar>
      </div>
      <div class="col-md-8 col-sm-12">
        <h4 class="title-4 bg_border bg_border--grey">Listing Page</h4>
        <div class="row">
          <div class="col-md-4">
            <div class="border box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border  box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border  box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border  box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="border  box-wrapper">
              <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
              </figure>
              <div class="bg-white p-3">
                <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                  literature from 45 BC, making it over 2000 years old.</p>
                <button class="btn btn-outline-success btn-sm">See Details</button>
              </div>
            </div>
          </div>
        </div>
<!--
        <div class="border">
          <ul class="list-style-none list-border">
            <li>
              <div class="media">
                <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                  <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
                </figure>
                <div class="media-body p-3">
                  <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                  <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one os</p>
                  <button class="btn btn-outline-success btn-sm">See Details</button>
                </div>
              </div>

            </li>
            <li>
              <div class="media">
                <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                  <img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
                </figure>
                <div class="media-body p-3">
                  <h5 class="mt-0 title-5 title-bold">iPhone X</h5>
                  <p class="title-sm">Random text. It has roots in a piece of classical Latin literature from 45 BC,
                    making it over 2000 years old.</p>
                  <button class="btn btn-outline-success btn-sm">See Details</button>
                </div>
              </div>
            </li>
            <li>
              <div class="media">
                <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                  <img src="../assets/img/jackets.jpg" alt="Jackets" class="block-absolute">
                </figure>
                <div class="media-body p-3">
                  <h5 class="mt-0 title-5 title-bold">Jackets</h5>
                  <p class="title-sm">It has roots in a piece of classical Latin literature from 45 BC, making it over
                    2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked
                    up one os</p>
                  <button class="btn btn-outline-success btn-sm">See Details</button>
                </div>
              </div>

            </li>
            <li>
              <div class="media">
                <figure class="img-wrap img-wrap-150 mr-3 mb-0">
                  <img src="../assets/img/iphone.jpg" alt="iPhone X" class="block-absolute">
                </figure>
                <div class="media-body p-3">
                  <h5 class="mt-0 title-5 title-bold">iPhone X</h5>
                  <p class="title-sm">Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
                    literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                    Hampden-Sydney College in Virginia, looked up one os</p>
                  <button class="btn btn-outline-success btn-sm">See Details</button>
                </div>
              </div>
            </li>
          </ul>
          <div class="text-center">

            <nav aria-label="..." class="d-inline-block">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div> -->

      </div>
    </div>

  </div>
</PublicLayout>
<!-- <ul> -->
<!-- {#each posts as post} -->
<!-- we're using the non-standard `rel=prefetch` attribute to
    tell Sapper to load the data for the page as soon as
    the user hovers over the link or taps it, instead of
    waiting for the 'click' event -->
<!-- <li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li> -->
<!-- {/each} -->
<!-- </ul> -->

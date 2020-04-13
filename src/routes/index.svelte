<script>

  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
</script>

<div class="container">
  <Header/>
  <h1>
    One man's trash is another's man treasure
  </h1>


  <div class="search-input">
    <input type="text" placeholder="What are you looking">
    <button>Search</button>
  </div>


  <div class="latest-products">
    <div class="row">

      <div class="col-sm-3">
        p1
      </div>
      <div class="col-sm-3">
        p2
      </div>
      <div class="col-sm-3">
        p3
      </div>
      <div class="col-sm-3">
        p4
      </div>
    </div>
  </div>
  <Footer/>
</div>

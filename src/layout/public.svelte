<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'

</script>

<div class="container-fluid">
  <Header/>
  <slot></slot>
  <Footer/>
</div>

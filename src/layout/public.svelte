<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'

</script>
<style lang="scss">
  @import '../assets/scss/base/main';
</style>

<div class="container-fluid">
  <Header/>
  <slot></slot>
  <Footer/>
</div>

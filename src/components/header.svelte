<script>
  import {CURRENT_USER} from './../services/store'
  import {USER_FIELDS} from './../entity/user'
  import { stores } from '@sapper/app';
  import Auth from './helpers/auth.svelte'
  const { page } = stores();

  let currentUser = USER_FIELDS;
  let bannerClass = '';

  CURRENT_USER.subscribe((v) => {
    return currentUser = v;
  })

  if($page.path === '/') {
    bannerClass = 'bg-transparent';
  }
</script>



<style lang="scss">
  // @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/navbar';
</style>

<Auth/>
<nav class="navbar navbar-expand-lg navbar-dark justify-content-between {bannerClass}">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="/">LOGO</a>
<div class="d-inline">
  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

      <li class="nav-item active mr-2">
        <a class="nav-link" href="/">Home</a>
      </li>

      {#if !currentUser.id}
        <li class="nav-item active mr-2">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-light" href="/register">SignUp</a>
        </li>
      {/if}

      {#if currentUser.id}
        <li class="nav-item active">
          <a class="nav-link" href="dashboard/product/add">Donate Stuffs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/dashboard/welcome">Dashboard</a>
        </li>
      {/if}
  </ul>
  </div>
</div>

</nav>


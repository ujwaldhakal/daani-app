<script>
  import {CURRENT_USER} from './../services/store'
  import {USER_FIELDS} from './../entity/user'

  let currentUser = USER_FIELDS;

  CURRENT_USER.subscribe((v) => {
    return currentUser = v;
  })
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a class="navbar-brand" href="/login">Navbar</a>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">

    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      {#if !currentUser.id}
        <li class="nav-item active">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Sign up</a>
        </li>
      {/if}

      {#if currentUser.id}
        <li class="nav-item active">
          <a class="nav-link" href="dashboard/product/add">Donate Stuffs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/register">Dashboard</a>
        </li>
      {/if}
  </ul>
  </div>
</nav>



<style>
  /*nav {*/
  /*  background-color: green !important;*/
  /*}*/
</style>

<script>
  import Header from "./../components/header.svelte";
  import Footer from "./../components/footer.svelte";
  import { onMount } from "svelte";
  import { query } from "svelte-apollo";
  import client from "./../services/graphql";
  import { ME } from "./../entity/auth";
  import { CURRENT_USER } from "./../services/store";
  import { USER_FIELDS } from "./../entity/user";
  import Sidebar from "./../components/dashboard/sidebar.svelte";
  import Auth from "./../components/helpers/auth.svelte";

  let AuthRedirectHandler;

  onMount(async () => {
    const module = await import("./../components/helpers/auth.svelte"); // for not rendering localstorage on ssr
    AuthRedirectHandler = module.default;
  });

  let currentUser = USER_FIELDS;

  CURRENT_USER.subscribe(v => {
    return (currentUser = v);
  });
</script>

<style lang="scss">
  :global(.navbar-vertical.navbar-expand-xs.fixed-left.open) {
    left: 250px !important;
  }
  .main-page {
    min-height: calc(100vh - 220px);
  }
  .footer {
    padding: 30px 0;
  }
  .snackbar {
    border: 2px solid var(--green);
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 99;
    background: #fff;
    border-radius: 10px;
    padding: 24px;
    max-width: 320px;

    button.close {
      position: absolute;
      right: 5px;
      top: 8px;
      background: none;
      border: none;
      width: 20px;
      height: 20px;
      padding: 0;
      font-size: 18px;
      color: var(--gray-dark);
    }
  }
</style>

<link rel="stylesheet" href="/assets/css/argon.min.css" />
<link rel="stylesheet" href="/assets/css/fontawesome.min.css" />
<link href="/assets/css/nucleo.css" rel="stylesheet" />
<svelte:component this={AuthRedirectHandler} />
<Auth />
{#if currentUser.id}
  <Sidebar />

  <div class="main-content" id="panel">
    <!-- Snackbar -->
    <div class="snackbar success">
      <button class="close">
        <i class="ni ni-fat-remove " />
      </button>
      <div class="content">
        <p>Your profile details are incomplete</p>
        <button class="btn btn-primary">Go to Profile</button>
      </div>
    </div>
    <!-- Topnav -->
    <nav
      class="navbar navbar-top navbar-expand navbar-dark bg-primary
      border-bottom">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- Search form -->
          <div class="navbar-search navbar-search-light form-inline mr-sm-3">
            <a href="/" style="color:white">Go to Home Page</a>
          </div>
          <ul class="navbar-nav align-items-center justify-end ml-auto ">
            <li class="nav-item d-xl-none">
              <!-- Sidenav toggler -->
              <div
                class="pr-3 sidenav-toggler sidenav-toggler-dark"
                data-action="sidenav-pin"
                data-target="#sidenav-main">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line" />
                  <i class="sidenav-toggler-line" />
                  <i class="sidenav-toggler-line" />
                </div>
              </div>
            </li>

          </ul>

          <ul class="navbar-nav align-items-center  ml-md-0 ">
            <li class="nav-item dropdown">
              <a
                class="nav-link pr-0"
                href="/"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">

                <div class="media align-items-center">
                  <div class="media-body ml-2 d-none d-lg-block">
                    <span class="mb-0 text-sm font-weight-bold">
                      Welcome {currentUser.name == null ? 'Human' : currentUser.name}
                    </span>
                  </div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-right ">
                <div class="dropdown-header noti-title">
                  <h6 class="text-overflow m-0">
                    Welcome {currentUser.name == null ? 'Human' : currentUser.name}
                  </h6>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </nav>
    <!-- Header -->
    <!-- Header -->
    <div class="header bg-primary pb-6">
      <div class="container-fluid">
        <div class="header-body">
          <div class="row align-items-center py-4">
            <div class="col-lg-6 col-7">
              <h6 class="h2 text-white d-inline-block mb-0">
                Donate your stuffs
              </h6>
            </div>
          </div>
          <!-- Card stats -->
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container-fluid mt--6 main-page">
      <div class="row">
        <div class="col-xl-12">
          <slot />
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="footer">
      <div class="container-fluid">
        <div class="row align-items-center justify-content-lg-between">
          <div class="col-lg-6">
            <div class="copyright text-center text-lg-left text-muted">
              &copy; 2020
              <a href="/" class="font-weight-bold ml-1">Daani</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
{/if}

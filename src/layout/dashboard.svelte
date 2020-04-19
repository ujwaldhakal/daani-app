<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import {onMount} from 'svelte';
  import {query} from 'svelte-apollo';
  import client from './../services/graphql'
  import {ME} from './../entity/auth'
  import {CURRENT_USER} from './../services/store'
  import {USER_FIELDS} from './../entity/user'
  import Sidebar from './../components/dashboard/sidebar.svelte'

  let AuthRedirectHandler;

  onMount(async () => {
    const module = await import('./../components/helpers/auth.svelte'); // for not rendering localstorage on ssr
    AuthRedirectHandler = module.default;
  });

  let currentUser = USER_FIELDS


  CURRENT_USER.subscribe((v) => {
    return currentUser = v;
  })


</script>


<!--<div class="container">-->
<!--  <svelte:component this={AuthRedirectHandler}/>-->
<!--  <Header/>-->
<!--  {#if currentUser.id}-->
<!--    <slot></slot>-->
<!--  {/if}-->
<!--  <Footer/>-->

<!--</div>-->

<link rel="stylesheet" href="/assets/css/argon.min.css">
<link rel="stylesheet" href="/assets/css/fontawesome.min.css">

<Sidebar/>

<div class="main-content" id="panel">
  <!-- Topnav -->
  <nav class="navbar navbar-top navbar-expand navbar-dark bg-primary border-bottom">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Search form -->
        <ul class="navbar-nav align-items-center  ml-md-auto ">
          <li class="nav-item d-xl-none">
            <!-- Sidenav toggler -->
            <div class="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
                 data-target="#sidenav-main">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </div>
          </li>
          <li class="nav-item d-sm-none">
            <a class="nav-link" href="/" data-action="search-show" data-target="#navbar-search-main">
              <i class="ni ni-zoom-split-in"></i>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
              <i class="ni ni-bell-55"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-xl  dropdown-menu-right  py-0 overflow-hidden">
              <!-- Dropdown header -->
              <div class="px-3 py-3">
                <h6 class="text-sm text-muted m-0">You have <strong class="text-primary">13</strong> notifications.</h6>
              </div>
              <!-- List group -->
              <div class="list-group list-group-flush">
                <a href="#!" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <img alt="Image placeholder" src="/assets/img/theme/team-1.jpg" class="avatar rounded-circle">
                    </div>
                    <div class="col ml--2">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 class="mb-0 text-sm">John Snow</h4>
                        </div>
                        <div class="text-right text-muted">
                          <small>2 hrs ago</small>
                        </div>
                      </div>
                      <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                    </div>
                  </div>
                </a>
                <a href="#!" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <img alt="Image placeholder" src="/assets/img/theme/team-2.jpg" class="avatar rounded-circle">
                    </div>
                    <div class="col ml--2">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 class="mb-0 text-sm">John Snow</h4>
                        </div>
                        <div class="text-right text-muted">
                          <small>3 hrs ago</small>
                        </div>
                      </div>
                      <p class="text-sm mb-0">A new issue has been reported for Argon.</p>
                    </div>
                  </div>
                </a>
                <a href="#!" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <img alt="Image placeholder" src="/assets/img/theme/team-3.jpg" class="avatar rounded-circle">
                    </div>
                    <div class="col ml--2">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 class="mb-0 text-sm">John Snow</h4>
                        </div>
                        <div class="text-right text-muted">
                          <small>5 hrs ago</small>
                        </div>
                      </div>
                      <p class="text-sm mb-0">Your posts have been liked a lot.</p>
                    </div>
                  </div>
                </a>
                <a href="#!" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <img alt="Image placeholder" src="/assets/img/theme/team-4.jpg" class="avatar rounded-circle">
                    </div>
                    <div class="col ml--2">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 class="mb-0 text-sm">John Snow</h4>
                        </div>
                        <div class="text-right text-muted">
                          <small>2 hrs ago</small>
                        </div>
                      </div>
                      <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
                    </div>
                  </div>
                </a>
                <a href="#!" class="list-group-item list-group-item-action">
                  <div class="row align-items-center">
                    <div class="col-auto">
                      <!-- Avatar -->
                      <img alt="Image placeholder" src="/assets/img/theme/team-5.jpg" class="avatar rounded-circle">
                    </div>
                    <div class="col ml--2">
                      <div class="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 class="mb-0 text-sm">John Snow</h4>
                        </div>
                        <div class="text-right text-muted">
                          <small>3 hrs ago</small>
                        </div>
                      </div>
                      <p class="text-sm mb-0">A new issue has been reported for Argon.</p>
                    </div>
                  </div>
                </a>
              </div>
              <!-- View all -->
              <a href="#!" class="dropdown-item text-center text-primary font-weight-bold py-3">View all</a>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link" href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
              <i class="ni ni-ungroup"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default  dropdown-menu-right ">
              <div class="row shortcuts px-4">
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-red">
                      <i class="ni ni-calendar-grid-58"></i>
                    </span>
                  <small>Calendar</small>
                </a>
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-orange">
                      <i class="ni ni-email-83"></i>
                    </span>
                  <small>Email</small>
                </a>
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-info">
                      <i class="ni ni-credit-card"></i>
                    </span>
                  <small>Payments</small>
                </a>
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-green">
                      <i class="ni ni-books"></i>
                    </span>
                  <small>Reports</small>
                </a>
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-purple">
                      <i class="ni ni-pin-3"></i>
                    </span>
                  <small>Maps</small>
                </a>
                <a href="#!" class="col-4 shortcut-item">
                    <span class="shortcut-media avatar rounded-circle bg-gradient-yellow">
                      <i class="ni ni-basket"></i>
                    </span>
                  <small>Shop</small>
                </a>
              </div>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
          <li class="nav-item dropdown">
            <a class="nav-link pr-0" href="/" role="button" data-toggle="dropdown" aria-haspopup="true"
               aria-expanded="false">
              <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="/assets/img/theme/team-4.jpg">
                  </span>
                <div class="media-body  ml-2  d-none d-lg-block">
                  <span class="mb-0 text-sm  font-weight-bold">John Snow</span>
                </div>
              </div>
            </a>
            <div class="dropdown-menu  dropdown-menu-right ">
              <div class="dropdown-header noti-title">
                <h6 class="text-overflow m-0">Welcome!</h6>
              </div>
              <a href="#!" class="dropdown-item">
                <i class="ni ni-single-02"></i>
                <span>My profile</span>
              </a>
              <a href="#!" class="dropdown-item">
                <i class="ni ni-settings-gear-65"></i>
                <span>Settings</span>
              </a>
              <a href="#!" class="dropdown-item">
                <i class="ni ni-calendar-grid-58"></i>
                <span>Activity</span>
              </a>
              <a href="#!" class="dropdown-item">
                <i class="ni ni-support-16"></i>
                <span>Support</span>
              </a>
              <div class="dropdown-divider"></div>
              <a href="#!" class="dropdown-item">
                <i class="ni ni-user-run"></i>
                <span>Logout</span>
              </a>
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
            <h6 class="h2 text-white d-inline-block mb-0">Add Product</h6>
          </div>

        </div>
        <!-- Card stats -->
      </div>
    </div>
  </div>
  <!-- Page content -->
  <div class="container-fluid mt--6">
    <div class="row">
      <div class="col-xl-12">
        <slot></slot>
      </div>
    </div>
    <!-- Footer -->
    <footer class="footer pt-0">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6">
          <div class="copyright text-center  text-lg-left  text-muted">
            &copy; 2020 <a href="https://www.creative-tim.com" class="font-weight-bold ml-1" target="_blank">Creative
            Tim</a>
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-end">
            <li class="nav-item">
              <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Template by Creative Tim</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</div>


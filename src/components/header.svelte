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
  @import '../assets/scss/base/components/button';
  @import '../assets/scss/base/components/navbar';
</style>

<Auth/>
<nav class="navbar navbar-expand-lg navbar-dark {bannerClass}">
  <a class="navbar-brand" href="/" style="width:125px"><span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 342 106">
      <g id="Group_2868" data-name="Group 2868" transform="translate(-132 -401)">
        <text id="Daani" transform="translate(246 487)" font-size="85" font-family="Volkswagen-Bold" font-weight="700"><tspan x="0" y="0">Daani</tspan></text>
        <g id="recycling" transform="translate(383.608 319.903)">
          <g id="Group_2867" data-name="Group 2867" transform="translate(-251.608 81.097)">
            <path id="Path_1" data-name="Path 1" d="M320.648,280.649l-12.916-25.44a4.06,4.06,0,1,0-7.243,3.671l12.818,25.264H296.5l3.023-3.023a4.053,4.053,0,0,0-5.732-5.732l-9.7,9.7a4.028,4.028,0,0,0,0,5.732l9.7,9.7a4.061,4.061,0,0,0,2.866,1.2,3.98,3.98,0,0,0,2.866-1.2,4.04,4.04,0,0,0,0-5.732l-2.493-2.532h16.489a7.985,7.985,0,0,0,7.126-11.6Z" transform="translate(-233.726 -205.505)"/>
            <path id="Path_2" data-name="Path 2" d="M50.924,248.328l1.433,3.808a4.056,4.056,0,0,0,7.6-2.846l-4.809-12.818a4.089,4.089,0,0,0-2.12-2.277,3.96,3.96,0,0,0-3.1-.1L37.1,238.906a4.1,4.1,0,0,0-2.277,2.12,4.063,4.063,0,0,0,5.123,5.477l3.474-1.315L33.257,265.249a7.985,7.985,0,0,0,7.106,11.6H63.723a4.063,4.063,0,1,0,0-8.127H40.579l10.345-20.4Z" transform="translate(-32.392 -190.105)"/>
            <path id="Path_3" data-name="Path 3" d="M200.66,48.688a3.936,3.936,0,0,0,2.081-2.3l4.633-12.9a4.054,4.054,0,0,0-7.636-2.729l-1.57,4.4-9.933-19.571a8.1,8.1,0,0,0-7.106-4.5,7.914,7.914,0,0,0-7.2,4.377L163.187,36.616a4.06,4.06,0,0,0,7.243,3.671l10.62-20.945,9.285,18.295-2.827-1.021a4.111,4.111,0,0,0-5.222,2.277,4.039,4.039,0,0,0,2.395,5.32l12.9,4.633a3.915,3.915,0,0,0,3.082-.157Z" transform="translate(-137.156 -11.097)"/>
          </g>
        </g>
      </g>
    </svg>
  </span></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
      <li class="nav-item active mr-2">
        <a class="nav-link" href="/">Home</a>
      </li>

      <li class="nav-item active mr-2">
        <a class="nav-link" href="/products">Products</a>
      </li>

      {#if !currentUser.id}
        <li class="nav-item active mr-2">
          <a class="nav-link" href="/login">Login</a>
        </li>
        <li class="nav-item">
          <a class="btn btn-light btn-radius" href="/register">SignUp</a>
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

      <li class="nav-item">
        <a class="nav-link" style="color:white" href="/privacy-policy">Privacy Policy</a>
      </li>
    </ul>
  </div>
</nav>

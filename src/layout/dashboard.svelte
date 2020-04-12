<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import {onMount} from 'svelte';
  import {query} from 'svelte-apollo';
  import client from './../services/graphql'
  import {ME} from './../entity/auth'
  import {CURRENT_USER} from './../services/store'
  import {USER_FIELDS} from './../entity/user'

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


<div class="container">
  <svelte:component this={AuthRedirectHandler}/>
  <Header/>
  {#if currentUser.id}
    yes lets see what happens
  {/if}
  <Footer/>

</div>

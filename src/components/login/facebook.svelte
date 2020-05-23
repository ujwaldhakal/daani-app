<script>
  import {loginWithFacebook} from './../../entity/auth'
  import {goto} from '@sapper/app';
  import {setLocalStorageItem} from './../../services/storage'
  import {onMount} from 'svelte';

  async function loginFacebook() {
    let res = await loginWithFacebook();

    if (res && res.api_token) {
      setLocalStorageItem('access_token', res.api_token)
        window.location = window.location.origin + '/dashboard/welcome'
        return

    }
  }

  let FacebookSdk;

  onMount(async () => {
    const module = await import('./../../components/helpers/facebook-sdk.svelte'); // for not rendering localstorage on ssr
    FacebookSdk = module.default;
  })

</script>

<svelte:component this={FacebookSdk}/>


<button class="btn btn-primary btn-block" on:click={loginFacebook}>Login with facebook</button>

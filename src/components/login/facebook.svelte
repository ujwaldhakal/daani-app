<script>
  import {loginWithFacebook} from './../../entity/auth'
  import {goto} from '@sapper/app';
  import {setLocalStorageItem} from './../../services/storage'
  import {onMount} from 'svelte';

  async function loginFacebook() {
    let res = await loginWithFacebook();

    if (res && res.api_token) {
      setLocalStorageItem('access_token', res.api_token)
      goto('dashboard/welcome')
    }
  }

  let FacebookSdk;

  onMount(async () => {
    const module = await import('./../../components/helpers/facebook-sdk.svelte'); // for not rendering localstorage on ssr
    FacebookSdk = module.default;
  })

</script>

<svelte:component this={FacebookSdk}/>


<button on:click={loginFacebook}>Login with facebook</button>

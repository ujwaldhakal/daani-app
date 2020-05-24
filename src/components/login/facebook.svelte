<script>
  import {loginWithFacebook} from './../../entity/auth'
  import {goto} from '@sapper/app';
  import {setLocalStorageItem} from './../../services/storage'
  import {onMount} from 'svelte';
  import Spinner from './../utils/loader/spinner.svelte'

  let loader = false;
  async function loginFacebook() {
    loader = true;

    try {
      let res = await loginWithFacebook();

      if (res && res.api_token) {
        setLocalStorageItem('access_token', res.api_token)
        window.location = window.location.origin + '/dashboard/welcome'
        return

      }

      loader = false;
    } catch (e) {
      consosle.log(e);
      loader = false;
    }
  }

  let FacebookSdk;

  onMount(async () => {
    const module = await import('./../../components/helpers/facebook-sdk.svelte'); // for not rendering localstorage on ssr
    FacebookSdk = module.default;
  })

</script>
<style lang="scss">
  @import '../../assets/scss/base/components/icon';
</style>
<svelte:component this={FacebookSdk}/>


<Spinner visibility={loader} />
<br>
<button class="btn btn-primary-outline btn-bloc" on:click={loginFacebook}>
<img class="icon-sm" src="assets/img/icons/common/facebook.png" alt="Facebook" />
Login with facebook</button>

<script>
  import {loginWithFacebook} from './../../entity/auth'
  import {goto} from '@sapper/app';
  import {setLocalStorageItem} from './../../services/storage'

  async function loginFacebook() {
    let res = await loginWithFacebook();

    if (res && res.api_token) {
      setLocalStorageItem('access_token', res.api_token)
      goto('dashboard/welcome')
    }
  }
</script>



<button on:click={loginFacebook}>Login with facebook</button>

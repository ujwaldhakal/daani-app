<script>
  import PublicLayout from './../layout/public.svelte'
  import Header from './../components/header.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import {setLocalStorageItem} from './../services/storage'
  import {login, requestEmailVerificationLink} from './../entity/auth'
  import {goto} from '@sapper/app';
  import Auth from './../components/helpers/auth.svelte'
  import FacebookLogin from './../components/login/facebook.svelte'
  import NotificationAlert from './../components/utils/notification/alert.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'

  let initialErrorState = {
    status: false,
    email: {
      message: ''
    },
    password: {
      message: ''
    },
    auth: {
      message: false
    }
  };


  let errors = initialErrorState;
  let buttonLoader = false;
  let email;
  let password;
  let showRequestVerificationLink = false;

  function resetError() {
    errors = initialErrorState
  }

  async function onSubmit(e) {
    buttonLoader = true;
    resetError();
    e.preventDefault();
    email = e.target.email.value;
    password = e.target.password.value;

    if (email == '') {
      errors.status = true;
      errors.email.message = "Please fill your email !"
    }

    if (password == '') {
      errors.status = true;
      errors.password.message = "Please fill your password !"
    }

    if (errors.status) {
      buttonLoader = false;
      return true
    }


    let res = await login(email, password);

    if (res && res.api_token) {
      setLocalStorageItem('access_token', res.api_token)
      window.location = window.location.origin + '/dashboard/welcome'
      return
    }

    if (res.error) {
      if(res.error && res.payload && res.payload.verified !== undefined && !res.payload.verified) {
        showRequestVerificationLink = true;
      }
      NOTIFICATION.update(() => {
        return {
          type: ERROR,
          message: res.error
        }
      })


    }

    buttonLoader = false;

  }


  const requestVerificationLink = async ()  => {

    const res = await requestEmailVerificationLink(email);

    let actionType = ERROR
    let message = 'Please email us @ support.com';
    if(res) {
      actionType = SUCCESS
      message  = 'Please check your inbox for verification email';
    }

    NOTIFICATION.update(() => {
      return {
        type: actionType,
        message: message
      }
    })
    console.log("requsting link",res);
  }

  const requestPasswordResetLink = () => {

    console.log("need to request password link");
  }

</script>
<Auth/>
<PublicLayout>
  <div class="container centered main-body pt-3">
    <h1 class="title-2 text-center">One man trash is anothers treasure</h1>
    <div class="card-wrapper centered mt-5">
      <form on:submit={onSubmit} class="form-center">
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <small id="email" class="form-text text-muted">{errors.email.message}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                id="exampleInputPassword1" placeholder="Password" name="password">
          <small id="password" class="form-text text-muted">{errors.password.message}</small>
        </div>
        <NotificationAlert/>
        {#if showRequestVerificationLink}
          <div class="request-verification">
            <span>You can re-generate email link from</span>
            <button on:click={requestVerificationLink}>here</button>
          </div>
        {/if}
        <Spinner visibility={buttonLoader}/>
          <button type="submit" class="btn btn-success">Login</button> or
          <FacebookLogin/>
          <a href="/forgot-password">Forgot Password</a>
      </form>
    </div>
  </div>
</PublicLayout>
<style lang="scss">
  @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/form';
</style>

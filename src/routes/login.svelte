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
  import ErrorText from './../components/utils/forms/error-messages.svelte'

  let errors;

  initializeLocalState();

  let loader = false;
  let email;
  let password;
  let showRequestVerificationLink = false;

  function initializeLocalState() {
    errors = JSON.parse(JSON.stringify({
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
    }));
  }

  async function onSubmit(e) {
    loader = true;
    initializeLocalState();
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
      loader = false;
      return;
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

    loader = false;

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
  <div class="container centered main-body pt-2">
    <h1 class="title-2 text-center">Welcome!</h1>
    <p>Use these awesome forms to login or create new account in your project for free.</p>
    <div class="card-wrapper centered text-center mt-4">
      <FacebookLogin/>
      <hr>
      <span class="text-center">Or sign in with credentials </span>
      <form on:submit={onSubmit} class="form-center mt-3">
        <div class="form-group">
          <!-- <label for="exampleInputEmail1">Email</label> -->
          <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          <ErrorText message={errors.email.message}/>
        </div>
        <div class="form-group">
          <!-- <label for="exampleInputPassword1">Password</label> -->
          <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                id="exampleInputPassword1" placeholder="Password" name="password">
          <ErrorText message={errors.password.message}/>
        </div>
        <NotificationAlert/>
        {#if showRequestVerificationLink}
          <div class="request-verification">
            <span>You can re-generate email link from</span>
            <button on:click={requestVerificationLink}>here</button>
          </div>
        {/if}
        <Spinner visibility={loader}/>
          <button type="submit" class="btn btn-success">Login</button>
          <!-- <FacebookLogin/> -->
        <a href="/forgot-password">Forgot Password</a>
      </form>
    </div>
  </div>
</PublicLayout>
<style lang="scss">
  @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/form';

  .bg-diagonal{
      /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#05abe0+50,87e0fd+50 */
      background: #05abe0; /* Old browsers */
      background: -moz-linear-gradient(-45deg,  #05abe0 50%, #87e0fd 50%); /* FF3.6-15 */
      background: -webkit-linear-gradient(-45deg,  #05abe0 50%,#87e0fd 50%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(135deg,  #05abe0 50%,#87e0fd 50%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#05abe0', endColorstr='#87e0fd',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  }
</style>

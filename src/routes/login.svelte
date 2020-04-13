<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import {setLocalStorageItem} from './../services/storage'
  import {login, loginWithFacebook} from './../entity/auth'
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

  function resetError() {
    errors = initialErrorState
  }

  async function onSubmit(e) {
    buttonLoader = true;
    e.preventDefault();

    resetError();
    const email = e.target.email.value;
    const password = e.target.password.value;

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
      goto('dashboard/welcome')
    }

    if (res.error) {
      NOTIFICATION.update(() => {
        return {
          type: ERROR,
          message: res.error
        }
      })
    }

    buttonLoader = false;


  }


</script>
<Auth/>
<PublicLayout>
  <div class="container">
    <h1>One man trash is anothers treasure</h1>
    <form on:submit={onSubmit}>
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

      <Spinner visibility={buttonLoader}/>
      <button type="submit" class="btn btn-primary">Login</button>

      OR

    </form>

    <FacebookLogin/>

  </div>
</PublicLayout>

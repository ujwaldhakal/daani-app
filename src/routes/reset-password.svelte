<script>
  import {stores} from '@sapper/app';
  import {validateResetToken,resetPassword} from './../entity/auth'
  import Loader from './../components/utils/loader/general.svelte'
  import NotificationAlert from './../components/utils/notification/alert.svelte'
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';
  import PublicLayout from './../layout/public.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'

  const {page} = stores();
  let label = 'Verifying your request';

  let initialErrorState = {
    status: false,
    password: {
      message: ''
    },
    confirm_password: {
      message: ''
    },
  };

  let password = false
  let confirmPassword = false
  let validToken = false
  let errors = initialErrorState;


  const token = $page.query && $page.query.token ? $page.query.token : '';
  onMount(async () => {

    const res = await validateResetToken(token);


    if (!res) {
      label = 'Invalid token!';
    }

    if (res) {
      label = 'Validated Successfully! ';
    }

    setTimeout(() => {
      label = 'Please wait!'
      validToken = res;

      if(!res) {
        NOTIFICATION.update(() => {
          return {
            type:  ERROR,
            message:  "Could not reset your password. Please contact support"
          }
        })
        goto('/login')
      }

    }, 2000)

    return;

  })

  const submit = async (e) => {
    e.preventDefault();
    password = e.target.password.value;
    confirmPassword = e.target.confirm_password.value;

    if (password == '') {
      errors.status = true;
      errors.password.message = "Please fill your password !"
    }

    if (confirmPassword == '') {
      errors.status = true;
      errors.confirm_password.message = "Please fill your confirm password !"
    }


    if(password == '' || password.length < 6) {
      errors.status = true;
      errors.password.message = 'Please enter password with at least 6 digit';
      return false;
    }

    if(confirmPassword == '' ) {
      errors.status = true;
      errors.confirm_password.message = 'Please enter confirm password';
      return false;
    }

    if(confirmPassword !== password) {
      errors.status = true;
      errors.password.message = errors.confirm_password.message = 'Password and confirm password didnt match';
      return false;
    }


    if (errors.status) {
      return true
    }

    const res = await resetPassword(token,password);

    NOTIFICATION.update(() => {
      return {
        type: res ? SUCCESS : ERROR,
        message: res ? "Successfully changed password now you can login with new credentials": "Please contact support"
      }
    })

    if(res) {
      goto('/login');
    }

  }


</script>

<style>
  @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/form';
</style>

{#if !validToken}
<Loader label={label}/>
{/if}
{#if validToken}
<PublicLayout>
  <div class="container centered main-body pt-3">
    <h1 class="title-2 text-center">One man trash is anothers treasure</h1>
    <div class="card-wrapper centered mt-5">
      <form on:submit={submit} class="form-center">
        <div class="form-group">
          <label for="exampleInputEmail1">New Passowrd</label>
          <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                 name="password" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="New Password">
          <small id="email" class="form-text text-muted">{errors.password.message}</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input type="password" name="confirm_password" class="form-control {errors.confirm_password.message ? ' is-invalid' : 'valid'}"
                 id="exampleInputPassword1" placeholder="Password">
          <small id="password" class="form-text text-muted">{errors.confirm_password.message}</small>
        </div>
        <NotificationAlert/>

        <button type="submit" class="btn btn-success">Reset Password</button>
      </form>
    </div>
  </div>
</PublicLayout>
{/if}

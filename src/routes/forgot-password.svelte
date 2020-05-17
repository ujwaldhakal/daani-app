<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import {setLocalStorageItem} from './../services/storage'
  import {login, requestEmailVerificationLink,forgotPassword} from './../entity/auth'
  import Auth from './../components/helpers/auth.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'
  import NotificationAlert from './../components/utils/notification/alert.svelte'

  let initialErrorState = {
    status: false,
    email: {
      message: ''
    },
  };


  let errors = initialErrorState;
  let buttonLoader = false;
  let email;

  function resetError() {
    errors = initialErrorState
  }

  async function onSubmit(e) {
    buttonLoader = true;
    resetError();
    e.preventDefault();
    email = e.target.email.value;

    if (email == '') {
      errors.status = true;
      errors.email.message = "Please fill your email !"
    }


    if (errors.status) {
      buttonLoader = false;
      return true
    }


    let res = await forgotPassword(email);


      NOTIFICATION.update(() => {
        return {
          type: res ? SUCCESS : ERROR,
          message: res ? 'Please check your email' : 'Please contact support!'
        }
      })

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
        <NotificationAlert/>
        <button type="submit" class="btn btn-success">Submit</button>
        or
        <a href="/login">Login</a>
      </form>
    </div>
  </div>
</PublicLayout>
<style lang="scss">
  @import '../assets/scss/base/main';
  @import '../assets/scss/base/components/form';
</style>

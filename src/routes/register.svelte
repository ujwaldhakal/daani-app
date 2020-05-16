<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import FacebookLogin from './../components/login/facebook.svelte'
  import {register} from './../entity/auth'
  import NotificationAlert from './../components/utils/notification/alert.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'
  import Auth from './../components/helpers/auth.svelte'

  let initialErrorState = {
    status: false,
    email: {
      message: ''
    },
    password: {
      message: ''
    },
    confirm_password: {
      message: ''
    },
    auth: {
      message: ''
    }
  };


  let buttonLoader = false;

  let errors = initialErrorState;


  function resetError() {
    errors = initialErrorState
    errors.email.message = '';
    errors.password.message = '';
    errors.confirm_password.message = '';
    errors.auth.message = '';
  }


  async function submit(e) {

    resetError();
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;

    if (email == '') {
      errors.status = true;
      errors.email.message = "Please fill your email !"
    }

    if (password == '') {
      errors.status = true;
      errors.password.message = "Please fill your password !"
    }

    if (confirm_password == '') {
      errors.status = true;
      errors.confirm_password.message = "Please fill your confirm password !"
    }


    if (confirm_password !== password) {
      errors.status = true;
      errors.confirm_password.message = errors.password.message = "Password and confirmation password does not match !"
    }

    if (errors.status) {
      // buttonLoader = false;
      return true
    }

    let response = await register(email, password);

    if (response.error) {

      NOTIFICATION.update(() => {
        return {type: ERROR, message: response.error}
      })

      return true;
    }


    NOTIFICATION.update(() => {
      return {type: SUCCESS, message: "Please check your email for verification"}
    })
  }

</script>

<Auth/>
<style lang="scss">
  // @import "src/assets/scss/test";
  @import '../assets/scss/base/helpers/font';
  @import '../assets/scss/base/components/button';
  @import '../assets/scss/base/components/form';
</style>

<PublicLayout>
  <div class="container main-body pt-3">
   <h1 class="title-2 text-center">One man trash is anothers treasure</h1>
    <div class="card-wrapper mt-5 centered w-80">
      <div class="row">
        <div class="col align-right">
          <div class="d-flex color-random  flex-column justify-content-center align-items-end h-100">
            <FacebookLogin/>
            <FacebookLogin/>
            <FacebookLogin/>
          </div>
        </div>
        <div class="divider-line mx-5">
          <span class="has_circle--sm item-center">OR</span>
        </div>
        <div class="col">
          <form on:submit={submit} class="form">
            <div class="form-group">
              <!-- <label for="exampleInputEmail1">Email address</label> -->
              <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                      id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
                      placeholder="Enter email">
              <small id="email" class="form-text text-muted">{errors.email.message}</small>
            </div>
            <div class="form-group">
              <!-- <label for="exampleInputPassword1">Password</label> -->
              <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                      name="password" id="exampleInputPassword1"
                      placeholder="Password">
              <small id="email" class="form-text text-muted">{errors.password.message}</small>
            </div>

            <div class="form-group">
              <!-- <label for="exampleInputPassword1">Confirm Password</label> -->
              <input type="password" class="form-control {errors.confirm_password.message ? ' is-invalid' : 'valid'}"
                      name="confirm_password" id="exampleInputPassword1"
                      placeholder="Confirm Password">
              <small id="email" class="form-text text-muted">{errors.confirm_password.message}</small>
            </div>

            <NotificationAlert/>

            <button type="submit" class="btn btn-success">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</PublicLayout>

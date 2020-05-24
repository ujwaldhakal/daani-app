<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import FacebookLogin from './../components/login/facebook.svelte'
  import {register} from './../entity/auth'
  import NotificationAlert from './../components/utils/notification/alert.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'
  import Auth from './../components/helpers/auth.svelte'
  import ErrorText from './../components/utils/forms/error-messages.svelte'

  let loader = false;
  let errors;

  function initializeLocalState() {
    errors = JSON.parse(JSON.stringify({
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
    }));

  }

  initializeLocalState();



  async function submit(e) {
    loader = true;
    initializeLocalState();
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
      loader = false;
      return true
    }

    let response = await register(email, password);

    if (response.error) {
      loader = false;
      NOTIFICATION.update(() => {
        return {type: ERROR, message: response.error}
      })

      loader = false;
      return true;
    }


    NOTIFICATION.update(() => {
      return {type: SUCCESS, message: "Please check your email for verification"}
    })
    loader = false;
  }

</script>

<Auth/>
<style lang="scss">
  // @import "src/assets/scss/test";
  @import '../assets/scss/base/helpers/font';
  @import '../assets/scss/base/components/button';
  @import '../assets/scss/base/components/card';
  @import '../assets/scss/base/components/form';
  @import '../assets/scss/base/utils/normalize';
</style>

<PublicLayout>
  <div class="container main-body pt-3">
   <h1 class="title-2 text-center">Register</h1>
    <div class="card-wrapper-sm mt-5 w-80-md">
      <div class="d-md-flex">
        <div class="col align-right">
          <div class="text-center d-md-flex color-random  flex-column justify-content-center align-items-md-end h-100">
            <FacebookLogin/>
          </div>
        </div>
        <div class="divider-line my-5 mx-3 mx-md-5 p-3 p-sm-0">
          <span class="has_circle--sm item-center">OR</span>
        </div>
        <div class="col">
          <form on:submit={submit} class="form">
            <div class="form-group">
              <!-- <label for="exampleInputEmail1">Email address</label> -->
              <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                      id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
                      placeholder="Enter email">
              <ErrorText message={errors.email.message}/>

            </div>
            <div class="form-group">
              <!-- <label for="exampleInputPassword1">Password</label> -->
              <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                      name="password" id="exampleInputPassword1"
                      placeholder="Password">
              <ErrorText message={errors.password.message}/>
            </div>

            <div class="form-group">
              <!-- <label for="exampleInputPassword1">Confirm Password</label> -->
              <input type="password" class="form-control {errors.confirm_password.message ? ' is-invalid' : 'valid'}"
                      name="confirm_password" id="exampleInputPassword1"
                      placeholder="Confirm Password">
              <ErrorText message={errors.confirm_password.message}/>
            </div>

            <NotificationAlert/>

            <Spinner visibility={loader}/>
            <br>
            <button type="submit" class="btn btn-success btn-block">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</PublicLayout>

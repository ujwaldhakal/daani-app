<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import FacebookLogin from './../components/login/facebook.svelte'
  import {register} from './../entity/auth'
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
      console.log("here too");
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

<PublicLayout>
  <div class="container">

    <div class="row">
      <div class="col-sm-6">
        <FacebookLogin/>
      </div>

      <div class="col-sm-6">
        <form on:submit={submit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                   id="exampleInputEmail1" name="email" aria-describedby="emailHelp"
                   placeholder="Enter email">
            <small id="email" class="form-text text-muted">{errors.email.message}</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" class="form-control {errors.password.message ? ' is-invalid' : 'valid'}"
                   name="password" id="exampleInputPassword1"
                   placeholder="Password">
            <small id="email" class="form-text text-muted">{errors.password.message}</small>
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input type="password" class="form-control {errors.confirm_password.message ? ' is-invalid' : 'valid'}"
                   name="confirm_password" id="exampleInputPassword1"
                   placeholder="Confirm Password">
            <small id="email" class="form-text text-muted">{errors.confirm_password.message}</small>
          </div>

          <NotificationAlert/>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>


    </div>

  </div>
</PublicLayout>

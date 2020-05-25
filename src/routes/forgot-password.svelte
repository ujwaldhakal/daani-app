<script>
  import PublicLayout from './../layout/public.svelte'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import {setLocalStorageItem} from './../services/storage'
  import {login, requestEmailVerificationLink,forgotPassword} from './../entity/auth'
  import Auth from './../components/helpers/auth.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../services/store'
  import NotificationAlert from './../components/utils/notification/alert.svelte'
  import ErrorText from './../components/utils/forms/error-messages.svelte'

  let errors;
  let loader = false;
  let email;

  function setInitialState() {
    errors = JSON.parse(JSON.stringify({
      status: false,
      email: {
        message: ''
      },
    }));
  }

  setInitialState();


  async function onSubmit(e) {
    loader = true;
    setInitialState();
    e.preventDefault();
    email = e.target.email.value;

    if (email == '') {
      errors.status = true;
      errors.email.message = "Please fill your email !"
    }


    if (errors.status) {
      loader = false;
      return true
    }


    let res = await forgotPassword(email);


      NOTIFICATION.update(() => {
        return {
          type: res ? SUCCESS : ERROR,
          message: res ? 'Please check your email' : 'Please contact us at support@daani.life '
        }
      })
    loader = false;

  }

</script>
<Auth/>
<PublicLayout>

  <div class="container centered main-body pt-3">
    <h1 class="title-2 text-center">Forgot Password</h1>
    <span>Enter your email address and you will receive an email.</span>
    <div class="card-wrapper centered mt-5">
      <form on:submit={onSubmit} class="form-center">
        <div class="form-group">
          <label for="exampleInputEmail1">Email</label>
          <input type="email" class="form-control {errors.email.message ? ' is-invalid' : 'valid'}"
                 name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">

          <ErrorText message={errors.email.message} />

        </div>
        <NotificationAlert/>
        <Spinner visibility={loader}/>
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

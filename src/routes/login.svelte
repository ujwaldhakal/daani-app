<script>

  import PublicLayout from './../layout/public.svelte'
  import {LOGIN} from './../entity/auth'
  import Spinner from './../components/utils/loader/spinner.svelte'
  import {getClient, setClient, mutate} from 'svelte-apollo';
  import {setLocalStorageItem} from './../services/storage'
  import {login} from './../entity/auth'

  let errors = {
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
  }

  let buttonLoader = false;

  function resetError() {
    errors = {
      status: false,
      email: {
        message: ''
      },
      password: {
        message: ''
      },
      auth: {
        message: ''
      }
    }
  }

  async function onSubmit(e) {
    buttonLoader = true;
    e.preventDefault();

    resetError();
    let email = e.target.email.value,
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


    try {
      let res = await login(email, password);

      if(res) {
        setLocalStorageItem('access_token',res.api_token)
      }

      if(!res) {
        errors.auth.message = 'Please try again'
      }
      buttonLoader = false;

    } catch (error) {
      errors.auth.message = 'Invalid credentials'
      buttonLoader = false;
    }

  }
</script>


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


      {#if errors.auth.message }
        <div class="alert alert-danger" role="alert">
          {errors.auth.message}
        </div>
      {/if}



      <Spinner visibility={buttonLoader}/>
      <button type="submit" class="btn btn-primary">Login</button>

      <p>Or </p>

      <button>Login with facebook</button>
    </form>

  </div>
</PublicLayout>

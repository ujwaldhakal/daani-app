<script>

  import PublicLayout from './../layout/public.svelte'
  // import {client} from './../services/graphql'
  import {LOGIN} from './../entity/auth'
  import { getClient,setClient, mutate } from 'svelte-apollo';


  import ApolloClient, { gql } from 'apollo-boost';

  const client = new ApolloClient({
    uri : 'https://graphql.pagevamp.pv/graphql',
  })


  setClient(client)

  let errors = {
    email: {
      message: ''
    },
    password: {
      message: ''
    },
  }

  function resetError() {
    errors = {
      status: false,
      email: {
        message: ''
      },
      password: {
        message: ''
      },
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    resetError();
    let email = e.target.email.value,
         password =   e.target.password.value;
    if (email) {
      status = true;
      errors.email.message = "Please fill your email !"
    }

    if (password) {
      status = true;
      errors.password.message = "Please fill your password !"
    }

    // if (errors.status) {
    //   return true
    // }

    const client = getClient();
    let title = '';
    let author = '';

      try {
        let res = await mutate(client, {
          mutation: LOGIN,
          variables: { email, password }
        });

        console.log(res);
      } catch(error) {
        console.log(error);
        // TODO
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

      <button type="submit" class="btn btn-primary">Login</button>

      <p>Or </p>

      <button>Login with facebook</button>
    </form>

  </div>
</PublicLayout>

import ApolloClient, {gql} from 'apollo-boost';
import client from "../services/graphql";
import {mutate} from 'svelte-apollo';


async function login(email, password) {
  const LOGIN = gql`
    mutation Login($email: String!,$password: String!){
      login(email: $email,password: $password) {
        api_token
      }
    }
  `;

  try {
    let res = await mutate(client, {
      mutation: LOGIN,
      variables: {email, password}
    });

    if (res.data && res.data.login) {
      return res.data.login;
    }

    return false;

  } catch (error) {

    console.log(error);
    return false;
  }

}


async function loginWithFacebook() {

  return new Promise(function (resolve, reject) {

    window.FB.login(function (res) {
      if (res.authResponse && res.authResponse.userID) {
        mutate(client, {
          mutation: gql`
            mutation loginWithFacebook($userID: String!,$token: String!){
              loginWithFacebook(user_id: $userID,token: $token) {
                api_token
              }
            }
          `,
          variables: {
            userID: res.authResponse.userID,
            token: res.authResponse.accessToken
          }
        }).then(function (response) {

          if (response.data && response.data.loginWithFacebook && response.data.loginWithFacebook.api_token) {
            resolve(response.data.loginWithFacebook);
            return;
          }
          resolve(false);
        }).catch(function (res) {

          reject(false);

        })
      }
    })

  });


}


async function register(email, password) {
  try {

    let response = await mutate(client, {
      errorPolicy: "all",
      mutation: gql`
        mutation Register($email: String!,$password: String!){
          register(email: $email,password: $password) {
            api_token
          }
        }
      `,
      variables: {
        email: email,
        password: password

      }
    })

    console.log(response);
    if (response.data && response.data.register) {
      return response.data.register;
    }


    if (response.errors && response.errors[0]) {
      let error = response.errors[0];
      if (error.extensions.validation && error.extensions.validation.email) {
        return {error: error.extensions.validation.email[0]}
      }
    }

    // throw new Error()

  } catch (e) {

    return  {error : "Something went wrong please contact support !"};

  }
}

export {login, loginWithFacebook,register}




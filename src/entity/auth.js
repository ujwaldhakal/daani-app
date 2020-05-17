import ApolloClient, {gql} from 'apollo-boost';
import {mutate} from "../services/graphql";
import {defaultErrorResponse} from "../services/error";


async function login(email, password) {
  const LOGIN = gql`
    mutation Login($email: String!,$password: String!){
      login(email: $email,password: $password) {
        api_token
      }
    }
  `;

  try {
    const res = await mutate(LOGIN, {email, password});

    if (res.data && res.data.login) {
      return res.data.login;
    }


    if (res.errors && res.errors[0]) {

      return {error: res.errors[0].message, payload : res.errors[0].extensions}
    }

    return false;

  } catch (error) {
    return defaultErrorResponse
  }

}


async function loginWithFacebook() {

  const schema = gql`
    mutation loginWithFacebook($userID: String!,$token: String!){
      loginWithFacebook(user_id: $userID,token: $token) {
        api_token
      }
    }
  `;
  return new Promise(function (resolve, reject) {

    window.FB.login(function (res) {
      if (res.authResponse && res.authResponse.userID) {

        mutate(schema,
          {
            userID: res.authResponse.userID,
            token: res.authResponse.accessToken
          }
        ).then(function (response) {

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
  const schema = gql`
    mutation Register($email: String!,$password: String!){
      register(email: $email,password: $password) {
        api_token
      }
    }
  `;
  try {
    const response = await mutate(schema, {
        email: email,
        password: password
      }
    )

    if (response.data && response.data.register) {
      return response.data.register;
    }


    if (response.errors && response.errors[0]) {
      const error = response.errors[0];
      if (error.extensions.validation && error.extensions.validation.email) {
        return {error: error.extensions.validation.email[0]}
      }
    }

    // throw new Error()

  } catch (e) {

    return defaultErrorResponse;

  }

}

async function verifyRegistrationToken(token) {
  const schema = gql`
    mutation verifyRegistration($token: String!){
      verifyRegistration(token: $token) {
        id
      }
    }
  `;

  try {
    const res = await mutate(schema,{
      token : token
    });

    console.log("checking shit",res);
    if(res && res.data && res.data.verifyRegistration && res.data.verifyRegistration.id)
    {
      return true;
    }
    return false;
  } catch (e) {

    return false
    console.log("error",e);
  }

}


async function requestEmailVerificationLink(email) {

  const schema = gql`
    mutation requestEmailVerificationLink($email: String!){
      requestEmailVerificationLink(email: $email)
    }
  `;

  try {
    const res = await mutate(schema,{
      email : email
    });

    if(!res.errors) {
      return res.data.requestEmailVerificationLink;
    }

    return false;

  } catch (e) {

    console.log("error",e);
  }

}

async function validateResetToken(token) {

  const schema = gql`
    mutation validateResetToken($token: String!){
      validateResetToken(token: $token)
    }
  `;

  try {
    const res = await mutate(schema,{
      token : token
    });

    if(!res.errors) {
      return res.data.validateResetToken;
    }

  } catch (e) {

    console.log("error",e);
  }

}


async function resetPassword(token,password) {

  const schema = gql`
    mutation resetPassword($token: String!,$password: String!){
      resetPassword(token: $token, password: $password)
    }
  `;

  try {

    const res = await mutate(schema,{ token : token, password: password});

    if(!res.errors) {
      return res.data.resetPassword;
    }
  } catch (e) {

    console.log(e);
    return false;

  }

}

async function forgotPassword(email) {

  const schema = gql`
    mutation forgotPassword($email: String!){
      forgotPassword(email: $email)
    }
  `;

  try {

    const res = await mutate(schema,{email: email});

    if(!res.errors) {
      return res.data.forgotPassword;
    }
    return false;
  } catch (e) {

    console.log(e);
    return false;

  }

}



export {login, loginWithFacebook, register,
  verifyRegistrationToken,requestEmailVerificationLink,
  validateResetToken,resetPassword,forgotPassword}




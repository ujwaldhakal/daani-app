import ApolloClient, {gql} from 'apollo-boost';
import client from "../services/graphql";


export default async function login(email, password) {
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

    return false;
  }

}





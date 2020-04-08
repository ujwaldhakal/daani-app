import ApolloClient, {gql} from 'apollo-boost';

const LOGIN = gql`
    mutation Login($email: String!,$password: String!){
      login(email: $email,password: $password) {
        api_token
      }
    }
  `;

export {
  LOGIN
}

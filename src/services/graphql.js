import ApolloClient, { gql } from 'apollo-boost';
import { setClient,query } from 'svelte-apollo';


export const client = new ApolloClient({
  uri : 'https://graphql.pagevamp.pv/graphql',
});



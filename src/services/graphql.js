import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from "apollo-client";
import axios from 'axios'
import {setContext} from 'apollo-link-context';
import {getLocalStorageItem} from "./storage";
import {mutate as gqlMutate,query as gqlQuery} from "svelte-apollo";
const {buildAxiosFetch} = require("@lifeomic/axios-fetch");


const httpLink = createHttpLink({uri: process.env.API_URL+'graphql', fetch: buildAxiosFetch(axios)});

console.log(getLocalStorageItem('access_token'));
const authLink = setContext((_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = getLocalStorageItem('access_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


export const mutate = (schema, variables) => {

  return gqlMutate(client, {
    errorPolicy: "all",
    mutation: schema,
    variables: variables
  });
};


export const query = (schema, variables) => {

  if (variables === undefined) {
    variables = {}
  }
  return gqlQuery(client, {
    errorPolicy: "all",
    query: schema,
    variables: variables
  }).result();
};

import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from "apollo-client";
import axios from 'axios'
const {buildAxiosFetch} = require("@lifeomic/axios-fetch");
import {setContext} from 'apollo-link-context';
import {getLocalStorageItem} from "./storage";


const httpLink = createHttpLink({uri: 'https://graphql.pagevamp.pv/graphql', fetch: buildAxiosFetch(axios)});

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

export default client

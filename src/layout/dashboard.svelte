<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import ApolloClient, { gql } from 'apollo-boost';
  import { setClient,query } from 'svelte-apollo';
  import fetch from 'node-fetch'

  const client = new ApolloClient({
    uri : 'https://graphql.pagevamp.pv/graphql',
    fetch:fetch
  })



  const BOOKS = gql`
  {
    me {
      id
      name
    }
  }
`;


  try {
    const books =  query(client, { query: BOOKS });
    console.log(books.result());

  } catch (e) {
    console.log(e);
  }
</script>


<div class="container">


</div>

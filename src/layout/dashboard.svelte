<script>
  import Header from './../components/header.svelte'
  import Footer from './../components/footer.svelte'
  import ApolloClient, { gql } from 'apollo-boost';
  import { setClient,query } from 'svelte-apollo';

  const client = new ApolloClient({
    uri : 'https://graphql.pagevamp.pv/graphql',
  })


  setClient(client)

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

<!--  {#await $books}-->
<!--    <li>Loading...</li>-->
<!--  {:then result}-->

<!--  {:catch error}-->
<!--    <li>Error loading books: {error}</li>-->
<!--  {/await}-->
  <Header/>
  <slot></slot>

  <Footer/>
</div>

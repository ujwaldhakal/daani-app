<script>
  import {getLocalStorageItem} from './../../services/storage'
  import {goto} from '@sapper/app';
  import {query} from 'svelte-apollo';
  import {onMount} from 'svelte';
  import client from './../../services/graphql'
  import {ME} from './../../entity/user'
  import {CURRENT_USER} from './../../services/store'

  onMount(async () => {

    if (!getLocalStorageItem('access_token')) {
        goto('/login')
        return
    }

    try {
      const res = await query(client, {query: ME}).result();

      if (res.data && res.data.me) {

        console.log("should update", res.data.me)
        CURRENT_USER.update(() => {
          return res.data.me;
        });
      }
      goto('/dashboard/welcome')

    } catch (e) {

      console.log("adn its og", e);
    }

  });


</script>

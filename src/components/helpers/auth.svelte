<script>
  import {getLocalStorageItem} from './../../services/storage'
  import {goto} from '@sapper/app';
  import {onMount} from 'svelte';
  import {query} from './../../services/graphql'
  import {ME} from './../../entity/user'
  import {CURRENT_USER} from './../../services/store'
  import { stores } from '@sapper/app';
  const { page } = stores();

  onMount(async () => {

    console.log($page.path.includes('register'));
    if (!getLocalStorageItem('access_token') && !$page.path.includes('register')) {
        goto('/login')
        return
    }

    try {
      const res = await query(ME);

      if (res.data && res.data.me) {

        console.log("should update", res.data.me)
        CURRENT_USER.update(() => {
          return res.data.me;
        });

        if($page.path && ($page.path.includes('register') ||$page.path.includes('login'))) {
          goto('/dashboard/welcome')
        }
      }



    } catch (e) {

      console.log("adn its og", e);
    }

  });


</script>

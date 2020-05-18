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


    console.log($page);
    if (!getLocalStorageItem('access_token') && !$page.path.includes('register')
            && $page.path !== '/' && !$page.path.includes('reset-password') &&
            !$page.path.includes('forgot-password') && !$page.path.includes('products') && !$page.path.includes('product')) {
        goto('/login')
        return
    }

    try {
      const res = await query(ME);

      if (res.data && res.data.me) {

        CURRENT_USER.update(() => {
          return res.data.me;
        });

        if($page.path && ($page.path.includes('register') ||$page.path.includes('login'))) {
          goto('/dashboard/welcome')
          return;
        }
      }

      if (res.data && !res.data.me) {
        if ($page.path && (!$page.path.includes('register') && !$page.path.includes('login') && $page.path !== '/') && !$page.path.includes('reset-password')
        && !$page.path.includes('forgot-password') && !$page.path.includes('products') && !$page.path.includes('product')) {
          goto('/login')
        }
      }

    } catch (e) {

      console.log("error", e);
    }

  });


</script>

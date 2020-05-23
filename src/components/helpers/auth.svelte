<script>
  import {getLocalStorageItem} from './../../services/storage'
  import {goto} from '@sapper/app';
  import {onMount} from 'svelte';
  import {query} from './../../services/graphql'
  import {ME} from './../../entity/user'
  import {CURRENT_USER} from './../../services/store'
  import { stores } from '@sapper/app';
  const { page } = stores();

  let authExcludedRoutes = [
          '/register',
          '/',
          '/reset-password',
          '/forgot-password',
          '/products',
          '/product',
          '/terms',
          'login'
  ];

  console.log("this is path",$page.path)
  onMount(async () => {


    let path = $page.path;

    if (!getLocalStorageItem('access_token') && !authExcludedRoutes.includes(path)) {
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
        if ($page.path && !authExcludedRoutes.includes(path)) {
          goto('/login')
        }
      }

    } catch (e) {

      console.log("error", e);
    }

  });


</script>

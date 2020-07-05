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
          '/privacy-policy',
          'login'
  ];

  let redirectForValidAuth = [
    '/login',
    '/reset-password',
    '/forgot-password',
    '/register',
  ];



  onMount(async () => {


    let path = $page.path;

    if (!getLocalStorageItem('access_token') && !authExcludedRoutes.includes(path) && !path.includes('/product')) {
        goto('/login')
        return
    }

    try {
      const res = await query(ME);

      if (res.data && res.data.me) {

        CURRENT_USER.update(() => {
          return res.data.me;
        });

        let redirectPath = '/dashboard/welcome'
        console.log("checking which name",res.data.name)
        if(!res.data.me.name || res.data.me.name === '' ) {
          redirectPath = '/dashboard/profile'
        }
        if($page.path && redirectForValidAuth.includes(path)) {
          goto(redirectPath);
          return;
        }
      }

      if (res.data && !res.data.me) {
        if ($page.path && !authExcludedRoutes.includes(path) && !path.includes('/product')) {
          goto('/login')
        }
      }

    } catch (e) {

      console.log("error", e);
    }

  });


</script>

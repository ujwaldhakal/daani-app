<script>
  import { stores } from '@sapper/app';
  import {verifyRegistrationToken} from './../entity/auth'
  import Loader from './../components/utils/loader/general.svelte'
  import {onMount} from 'svelte';
  import {goto} from '@sapper/app';

  const { page } = stores();
  let label = 'Verifying your email';

  const token = $page.query && $page.query.token ? $page.query.token : '';
  onMount( async () => {

    const res = await verifyRegistrationToken(token);

    if(!res) {
      label = 'Invalid token!';
    }

   if(res) {
     label = 'Validated Successfully! ';
    }

      setTimeout(() => {
        label = 'Please wait!'
        goto('/login');
      },2000)

      return;

  })


</script>


<Loader label={label}/>

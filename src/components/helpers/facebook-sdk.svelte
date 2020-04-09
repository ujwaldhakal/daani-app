<script>
  import {onMount} from 'svelte';

  onMount(() => {
    // if (window !== undefined) {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '636535317177753',
          cookie: true,
          xfbml: true,
          version: 'v5.0'
        });
        window.FB.AppEvents.logPageView();
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    // }
  })
</script>

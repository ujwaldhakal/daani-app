<script>
  import {NOTIFICATION} from './../../../services/store'

  let notification = {
    type: '',
    message: ''
  }

  NOTIFICATION.subscribe((prevNotification) => {
       notification.type = prevNotification.type,
       notification.message = prevNotification.message

    if(prevNotification != '') {
      setTimeout(() => {

        NOTIFICATION.update(() => {
          return {
                type: '',
                message: ''
          }
        })
      }, 3000);
    }
  })

</script>


{#if notification.message }
  <div class="alert alert-{notification.type}" role="alert">
    {notification.message}
  </div>
{/if}

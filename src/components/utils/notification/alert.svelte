<script>
  import {NOTIFICATION} from './../../../services/store'

  let notification = {
    type: '',
    message: ''
  }

  NOTIFICATION.subscribe((prevNotification) => {
    notification.type = prevNotification.type,
            notification.message = prevNotification.message

    if (prevNotification.type != '') {
      setTimeout(() => {

        NOTIFICATION.update(() => {
          return {
            type: '',
            message: ''
          }
        })
      }, 5000);
    }
  })

</script>


{#if notification.message }

  <div class="alert alert-{notification.type} alert-dismissible fade show" role="alert">
    <span class="alert-icon"><i class="ni ni-like-2"></i></span>
    <span class="alert-text">
      {notification.message}
    </span>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
{/if}

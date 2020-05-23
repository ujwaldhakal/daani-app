<script>
  import DashboardLayout from './../../layout/dashboard.svelte'
  import {CURRENT_USER,NOTIFICATION, SUCCESS, ERROR} from './../../services/store'
  import {USER_FIELDS,update} from './../../entity/user'
  import NotificationAlert from './../../components/utils/notification/alert.svelte'
  let currentUser = USER_FIELDS
  let password = '';
  let confirmPassword = '';
  let validationError = {
    password : {
      message : ''
    },

    confirmPassword : {
      message : ''
    },
  }

  const updateProfile = async (event) => {
    event.preventDefault();

    console.log(event);
    const res = await update(currentUser);


    NOTIFICATION.update(() => {
      return {
        type: res.error ? ERROR : SUCCESS,
        message: res.error ? res.error : 'Updated successfully'
      }
    })
  }


  const updatePassword = async (event) => {
    event.preventDefault();
    validationError.password.message = '';
    validationError.confirmPassword.message = '';
    if(password == '' || password.length < 6) {

      validationError.password.message = 'Please enter password with at least 6 digit';
      return false;
    }

    if(confirmPassword == '' ) {
      validationError.confirmPassword.message = 'Please enter confirm password';
      return false;
    }

    if(confirmPassword !== password) {
      validationError.password.message = validationError.confirmPassword.message = 'Password and confirm password didnt match';
      return false;
    }
    console.log("update password");
    const res = await update({password: password});
    NOTIFICATION.update(() => {
      return {
        type: res.error ? ERROR : SUCCESS,
        message: res.error ? res.error : 'Updated successfully'
      }
    })
  }


  CURRENT_USER.subscribe((v) => {
    return currentUser = v;
  })
</script>

<DashboardLayout>
  <div class="row">
    <div class="col-xl-8 order-xl-1">
      <div class="card">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col-8">
              <h3 class="mb-0">Edit profile </h3>
            </div>

          </div>
        </div>
        <div class="card-body">
          <NotificationAlert/>
          <form on:submit={updateProfile}>
            <h6 class="heading-small text-muted mb-4">User information</h6>
            <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="name">Name</label>
                    <input type="text" id="name" class="form-control" name="name" placeholder="Username" bind:value={currentUser.name}>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="email">Email address</label>
                    <input type="email" id="email" class="form-control" name="email" bind:value={currentUser.email}>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="phone_number">Phone Number
                      (Add working phone number so people can call you for product)</label>
                    <input type="tel" id="phone_number" class="form-control" name="phone_number"
                           bind:value={currentUser.phone_number}>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="address">Address </label>
                    <input type="text" id="address" class="form-control" name="address" bind:value={currentUser.address}>
                  </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>

          <hr class="my-4">
          <form on:submit={updatePassword}>

            <h6 class="heading-small text-muted mb-4">Change Password</h6>
            <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="name">New Password</label>
                    <input type="password" id="name" class="form-control {validationError.password.message !=='' ? 'is-invalid': ''}" name="password"  bind:value={password}>
                    <small>{validationError.password.message}</small>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="email">Confirm Password</label>
                    <input type="password" id="email" class="form-control {validationError.confirmPassword.message !=='' ? 'is-invalid': ''}" name="confirm_password" bind:value={confirmPassword}>
                    <small>{validationError.confirmPassword.message}</small>
                  </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>


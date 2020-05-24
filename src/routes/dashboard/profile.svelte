<script>
  import DashboardLayout from './../../layout/dashboard.svelte'
  import {CURRENT_USER,NOTIFICATION, SUCCESS, ERROR} from './../../services/store'
  import {USER_FIELDS,update} from './../../entity/user'
  import NotificationAlert from './../../components/utils/notification/alert.svelte'
  import ErrorText from  './../../components/utils/forms/error-messages.svelte'
  let currentUser = USER_FIELDS
  let password = '';
  let confirmPassword = '';
  let validationError;


  function initializeInitialState() {
    validationError = JSON.parse(JSON.stringify(
            {
              status: false,
              password: {
                message: ''
              },

              confirmPassword: {
                message: ''
              },

              phone: {
                message: ''
              },

              address: {
                message: ''
              },
              name: {
                message: ''
              }
            }
    ));
  }

  initializeInitialState();


  const updateProfile = async (event) => {
    initializeInitialState();
    event.preventDefault();

    const name = event.target.name.value;
    const address = event.target.address.value;
    const phone = event.target.phone_number.value;

    if(name === '') {
      validationError.status = true;
      validationError.name.message = 'Please fill your name'
    }

    if(address === '') {
      validationError.status = true;
      validationError.address.message = 'Please fill your address'
    }

    if(phone === '') {
      validationError.status = true;
      validationError.phone.message = 'Please fill your phone'
    }

    if(validationError.status) {

      return;
    }

    console.log("event after saving",event);
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

      validationError.password.message = validationError.confirmPassword.message = 'Please enter password with at least 6 digit';
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

          <form on:submit={updateProfile}>
            <h6 class="heading-small text-muted mb-4">User information</h6>
            <div class="row">
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="name">Name *</label>
                    <input type="text" id="name" class="form-control" name="name" placeholder="Name" bind:value={currentUser.name}>
                    <ErrorText message={validationError.name.message}/>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="email">Email address *</label>
                    <input type="email" id="email" class="form-control" name="email" bind:value={currentUser.email} disabled>

                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="phone_number">Phone Number *
                      (Add working phone number so people can call you for product)</label>
                    <input type="tel" id="phone_number" class="form-control" name="phone_number"
                           bind:value={currentUser.phone_number}>
                    <ErrorText message={validationError.phone.message}/>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="address">Address * (This address will be used to contact you) </label>
                    <input type="text" id="address" class="form-control" name="address" bind:value={currentUser.address}>
                    <ErrorText message={validationError.address.message}/>
                  </div>
                </div>
            </div>
            <NotificationAlert/>
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

                    <ErrorText message={validationError.password.message}/>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-group">
                    <label class="form-control-label" for="email">Confirm Password</label>
                    <input type="password" id="email" class="form-control {validationError.confirmPassword.message !=='' ? 'is-invalid': ''}" name="confirm_password" bind:value={confirmPassword}>
                    <ErrorText message={validationError.confirmPassword.message}/>
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


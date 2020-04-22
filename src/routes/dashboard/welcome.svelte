<script>
  import DashboardLayout from './../../layout/dashboard.svelte'
  import {onMount} from 'svelte';
  import {stat} from './../../entity/stat'

  let totalProducts = 0
  let totalUsers = 0
  let totalSoldProducts = 0
  onMount(async () => {
    const res = await stat();
    if (res && !res.error) {
      totalProducts = res.total_products;
      totalUsers = res.total_users;
      totalSoldProducts = res.total_sold_products;
    }
  })

</script>

<DashboardLayout>
  <div class="row">
    <div class="col-xl-3 col-md-6">
      <div class="card card-stats">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0">Total Products Listed</h5>
              <span class="h2 font-weight-bold mb-0">{totalProducts}</span>

            </div>
            <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
              <i class="ni ni-shop"></i>
            </div>
          </div>
          <p class="mt-3 mb-0 text-sm">
            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> Increasing</span>
          </p>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <div class="card card-stats">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0">Total Donated Products</h5>
              <span class="h2 font-weight-bold mb-0">{totalSoldProducts}</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                <i class="ni ni-money-coins"></i>
              </div>
            </div>
          </div>
          <p class="mt-3 mb-0 text-sm">
            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> Increasing</span>
          </p>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6">
      <div class="card card-stats">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0">Total Users</h5>
              <span class="h2 font-weight-bold mb-0">{totalUsers}</span>
            </div>
            <div class="col-auto">
              <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                <i class="ni ni-user-run"></i>
              </div>
            </div>
          </div>
          <p class="mt-3 mb-0 text-sm">
            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> Increasing</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</DashboardLayout>

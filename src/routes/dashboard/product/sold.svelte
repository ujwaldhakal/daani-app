<script>
  import DashboardLayout from "./../../../layout/dashboard.svelte";
  import ProductsTableListView from "./../../../components/dashboard/products/table-list.svelte";

  let filter = {
    sold: true
  };
</script>

<DashboardLayout>

  <div class="card">
    <!-- Card header -->
    <div class="card-header border-0">
      <h3 class="mb-0">Your all sold product list</h3>
    </div>
    <!-- Light table -->
    <ProductsTableListView initialFilter={filter} />

  </div>

</DashboardLayout>

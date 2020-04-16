<script>
  import DashboardLayout from './../../../layout/dashboard.svelte'
  import {listProducts, sold, destroy} from './../../../entity/product'
  import {onMount} from 'svelte';

  let products = [];
  let paginator = {};
  let initialPage = 1;
  onMount(async () => {
    await loadProducts(initialPage)
  });

  async function loadProducts(initialPage,filters) {
    let res = await listProducts(initialPage,filters);

    if (res.error) {
      return true;
    }
    const collection = products.concat(res.data);
    products = collection;
    paginator = res.paginatorInfo
  }

  async function loadMore() {
    initialPage += 1
    await loadProducts(initialPage);
  }

  async function search(e) {
    products = [];
    console.log("how many req")
    let res = await loadProducts(initialPage,{search: "asd"})
    console.log(res,"done");
  }

  async function soldOut(id) {
    let response = await sold(id);

    if (response.id) {
      const newCollection = products.map((item) => {
        if (item.id == id) {
          item.is_available = 0;
        }
        return item;
      })

      products = newCollection;
    }
  }

  async function deleteProduct(id) {
    let response = await destroy(id);
    if (response.id) {
      const newCollection = products.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      })

      products = newCollection;
    }
  }
</script>
<div class="container">
  <DashboardLayout>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="exampleInputEmail1">Search</label>
          <input type="text" class="form-control" aria-describedby="emailHelp" placeholder="Search Query" on:keypress={search}>
        </div>
        <table class="table table-image">
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Category</th>
            <th scope="col">Image</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          {#each products as product}
            <tr>
              <th scope="row">{product.name}</th>
              <td>{product.category ? product.category.name : ''}</td>
              <td class="w-25">
                {#each product.media as image}
                  {#if image.category == "cover_image"}
                    <img src={image.path}
                         class="img-fluid img-thumbnail" alt="" width="100px">
                  {/if}
                {/each}
              </td>
              <td>{product.is_available ? "available" : "sold out"}</td>
              <td>
                {#if product.is_available }
                  <button on:click={() => soldOut(product.id) }> Sold Out</button>
                  <button> Edit</button>
                  <button on:click={() => deleteProduct(product.id)}> Delete</button>
                {:else}
                  <p>No action required</p>
                {/if}
              </td>

            </tr>
          {/each}
          </tbody>
        </table>

        {#if products.length < paginator.total}
          <button on:click={loadMore}> Load More</button>
        {/if}
      </div>
    </div>
  </DashboardLayout>
</div>

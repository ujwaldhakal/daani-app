<script>

  export let initialFilter;
  import {listProducts, sold, destroy} from './../../../entity/product'

  import {onMount} from 'svelte';

  let products = [];
  let paginator = {};
  let initialPage = 1;
  onMount(async () => {
    await loadProducts(initialPage,initialFilter)
  });

  async function loadProducts(initialPage,filter) {
    let res = await listProducts(initialPage,filter);

    if (res.error) {
      return true;
    }
    const collection = products.concat(res.data);
    products = collection;
    paginator = res.paginatorInfo
  }

  async function loadMore() {
    initialPage += 1
    await loadProducts(initialPage, initialFilter);
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


  let timer;
  async function search(e) {

    clearTimeout(timer);
    timer = setTimeout(async () => {
      products = []
      const searchKeyword = e.target.value;
      initialFilter.search = searchKeyword;
      await loadProducts(initialPage,initialFilter)
      console.log(searchKeyword);
    }, 750);

  }
</script>

<div class="table-responsive">
  <div class="p-4 bg-secondary">
    <p>Search</p>
    <input type="text" class="form-control form-control-alternative" placeholder="Enter Your Search Query" on:keyup={search}>
  </div>
  <table class="table align-items-center table-flush">
    <thead class="thead-light">
    <tr>
      <th scope="col" class="sort" data-sort="name">Name</th>
      <th scope="col" class="sort" data-sort="budget">Category</th>
      <th scope="col" class="sort" data-sort="status">Image</th>
      <th scope="col" class="sort" data-sort="completion">Action</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody class="list">

    {#each products as product}
      <tr>
        <th scope="row">
          <span>{product.name}</span>
        </th>
        <td class="budget">
          <span>{product.category ? product.category.name : ''}</span>
        </td>
        <td>
          <div class="avatar-group">
                <span>
                  {product.category ? product.category.name : ''}
                </span>
          </div>
        </td>

        <td>
          {#if product.is_available }
            <button on:click={() => soldOut(product.id) }> Sold Out</button>
            <a href="/dashboard/product/edit/{product.slug}"> Edit</a>
            <button on:click={() => deleteProduct(product.id)}> Delete</button>
          {:else}
            <p>Sold out</p>
          {/if}

        </td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>

<!-- Card footer -->
<div class="card-footer py-4">
  {#if products.length < paginator.total}
    <button on:click={loadMore}> Load More</button>
  {/if}
</div>

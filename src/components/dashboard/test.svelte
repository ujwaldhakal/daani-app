<div class="row">
  <div class="card">
    <!-- Card header -->
    <div class="card-header border-0">
      <h3 class="mb-0">Your all active product list</h3>
    </div>
    <!-- Light table -->
    <div class="table-responsive">
      <table class="table align-items-center table-flush">
        <thead class="thead-light">
        <tr>
          <th scope="col" class="sort" data-sort="name">Name</th>
          <th scope="col" class="sort" data-sort="budget">Category</th>
          <th scope="col" class="sort" data-sort="status">Image</th>
          <th scope="col">Status</th>
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
                      <span class="badge badge-dot mr-4">
                        <i class="bg-warning"></i>
                        <span class="status">pending</span>
                      </span>
            </td>
            <td>
              <div class="d-flex align-items-center">
                <span class="completion mr-2">60%</span>
                <div>
                  <div class="progress">
                    <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                         aria-valuemax="100" style="width: 60%;"></div>
                  </div>
                </div>
              </div>
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

      <!--      <nav aria-label="...">-->
<!--        <ul class="pagination justify-content-end mb-0">-->
<!--          <li class="page-item disabled">-->
<!--            <a class="page-link" href="#" tabindex="-1">-->
<!--              <i class="fas fa-angle-left"></i>-->
<!--              <span class="sr-only">Previous</span>-->
<!--            </a>-->
<!--          </li>-->
<!--          <li class="page-item active">-->
<!--            <a class="page-link" href="#">1</a>-->
<!--          </li>-->
<!--          <li class="page-item">-->
<!--            <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>-->
<!--          </li>-->
<!--          <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--          <li class="page-item">-->
<!--            <a class="page-link" href="#">-->
<!--              <i class="fas fa-angle-right"></i>-->
<!--              <span class="sr-only">Next</span>-->
<!--            </a>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </nav>-->
    </div>
  </div>
</div>

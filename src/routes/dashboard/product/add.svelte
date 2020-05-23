<script>
  import Header from "../../../components/header.svelte";
  import Footer from "../../../components/footer.svelte";
  import { loadCategories, add } from "./../../../entity/product";
  import { onMount } from "svelte";
  import axios from "axios";
  import DashboardLayout from "../../../layout/dashboard.svelte";
  import NotificationAlert from "./../../../components/utils/notification/alert.svelte";
  import { NOTIFICATION, SUCCESS, ERROR } from "./../../../services/store";
  import Spinner from "./../../../components/utils/loader/spinner.svelte";

  let galleryPreviews = {};
  let formData;
  let errors;
  let loader = false;

  function initializeInitialErrors() {
    errors = JSON.parse(
      JSON.stringify({
        status: false,
        name: {
          message: ""
        },
        catId: {
          message: ""
        },
        coverPicId: {
          message: ""
        },
        galleryIds: {
          message: ""
        },
        description: {
          message: ""
        }
      })
    );
  }
  initializeInitialErrors();

  function initializeInitialFormData() {
    formData = JSON.parse(
      JSON.stringify({
        name: "",
        categories: [],
        subCategories: [],
        subCatId: 0,
        catId: 0,
        coverImagePreview: "",
        coverPicId: 0,
        description: "",
        galleryIds: 0,
        coverPic: 0
      })
    );
  }

  initializeInitialFormData();

  onMount(async () => {
    let res = await loadCategories();
    if (res.error) {
      return true;
    }

    formData.categories = res;
  });

  function selectCategory(e) {
    formData.catId = e.target.value;
    let processedCategories = [];
    formData.categories.filter(item => {
      if (item.parent_id == formData.catId) {
        processedCategories.push(item);
      }
    });

    formData.subCategories = processedCategories;
  }

  function selectSubCategory(e) {
    formData.subCatId = e.target.value;
  }

  async function uploadGallery(e) {
    console.log(e.target.files);
    if (e.target.files.length > 3) {
      let message = "You can only upload 3 photos max only";
      errors.galleryIds.message = message;

      // alert(message);

      return true;
    }

    try {
      const localFormData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        // galleryPreviews.push(URL.createObjectURL(e.target.files[i]))
        localFormData.append("files[]", e.target.files[i]);
      }

      localFormData.append("subject_type", "product");

      localFormData.append("category", "gallery");
      let url = process.env.API_URL + "api/media";
      let res = await axios.post(url, localFormData);
      if (res.data.status === "success") {
        galleryPreviews = res.data.data;
        formData.galleryIds = Object.keys(galleryPreviews).toString();
      }
    } catch (e) {
      console.log(e);
    }
    // formData.galleryPreviews = galleryPreviews;
  }

  async function uploadCoverImage(e) {
    formData.coverImagePreview = URL.createObjectURL(e.target.files[0]);

    try {
      let targetFile = e.target.files;
      const localFormData = new FormData();

      // console.log("yeah length need",e.target.length);
      for (let i = 0; i < e.target.files.length; i++) {
        localFormData.append("files[]", e.target.files[i]);

        localFormData.append("subject_type", "product");

        localFormData.append("category", "cover_image");
        let url = process.env.API_URL + "api/media";
        let res = await axios.post(url, localFormData);
        if (res.data.status === "success") {
          formData.coverPicId = Object.keys(res.data.data)[0];
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function submit(e) {
    loader = true;
    initializeInitialErrors();
    e.preventDefault();

    if (e.target.name.value == "") {
      errors.status = true;
      errors.name.message = "Please enter product name!";
    }

    if (e.target.catId.value == "") {
      errors.status = true;
      errors.catId.message = "Please select category!";
    }

    if (e.target.description.value == "") {
      errors.status = true;
      errors.description.message =
        "Enter description about product, location, contact etc !";
    }

    if (formData.coverPicId == 0) {
      errors.status = true;
      errors.coverPicId.message = "Select at least one cover image";
    }

    if (errors.status) {
      loader = false;
      return true;
    }

    const res = await add(formData);
    loader = false;
    NOTIFICATION.update(() => {
      return {
        type: res.error ? ERROR : SUCCESS,
        message: res.error ? res.error : "Added successfully"
      };
    });

    initializeInitialFormData();
  }

  const removeGallery = id => {
    let galleryIds = formData.galleryIds.split(",");

    formData.galleryIds = galleryIds
      .filter(existingId => {
        if (existingId !== id) {
          return id;
        }
      })
      .toString();

    delete galleryPreviews[id];
    galleryPreviews = galleryPreviews;
  };
</script>

<style lang="scss" scoped>
  .card {
    background: #f7fafc;

    &-thumbs {
      display: grid;
      grid-column: 1;
      grid-template-columns: repeat(3, 1fr);
    }
    &-thumbnail {
      overflow: hidden;
      max-width: 300px;

      button {
        background: none;
        border: none;
        background: var(--blue);
        border-radius: 0;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
      }

      img {
        object-fit: cover;
        width: 100%;
        height: 150px;
      }
    }
  }
  .custom-file {
    position: relative;
    margin-bottom: 4px;
    &-input {
      opacity: 0;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      margin: 0 !important;
      width: 100% !important;
      opacity: 0 !important;
    }
  }

  .error-text {
    display: block;
    margin-bottom: 8px;
    color: #f5365c;
  }
</style>

<DashboardLayout>

  <form on:submit={submit}>

    <div class="card">

      <div class="card-header bg-transparent">
        <div class="row align-items-center">
          <div class="col">
            <h6 class="text-uppercase text-muted ls-1 mb-1">
              Fill out all the information below to donate
            </h6>
          </div>
        </div>
      </div>
      <div class="card-body">

        <div class="bg-secondary p-1">
          <label for="exampleFormControlInput1">Product Name</label>
          <input
            type="text"
            class="form-control form-control-alternative {errors.name.message ? ' is-invalid' : 'valid'}"
            name="name"
            placeholder="Product Name"
            bind:value={formData.name} />
        </div>
        <small class="error-text">{errors.name.message}</small>
        <div class="bg-secondary p-1">
          <label for="exampleFormControlInput1">Select Category</label>
          <select
            class="form-control {errors.catId.message ? ' is-invalid' : 'valid'}"
            name="catId"
            on:change={selectCategory}
            id="exampleFormControlSelect1">
            <option value="">Please select category</option>
            {#each formData.categories as category}
              {#if !category.parent_id}
                <option value={category.id}>{category.name}</option>
              {/if}
            {/each}
          </select>
        </div>
        <small class="error-text">{errors.catId.message}</small>

        {#if formData.subCategories.length > 0}
          <div class="bg-secondary p-1">
            <label for="exampleFormControlInput1">Select Category</label>
            <select
              class="form-control {errors.catId.message ? ' is-invalid' : 'valid'}"
              on:change={selectSubCategory}>
              id="exampleFormControlSelect1">
              <option value="">Please select category</option>
              {#each formData.subCategories as category}
                <option value={category.id}>{category.name}</option>
              {/each}
            </select>
          </div>
          <small class="error-text">{errors.catId.message}</small>
        {/if}

        <div class="bg-secondary p-1">
          <label for="exampleFormControlInput1">Description</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1 {errors.description.message ? ' is-invalid' : 'valid'}"
            rows="3"
            name="description"
            bind:value={formData.description} />
        </div>
        <small class="error-text">{errors.description.message}</small>

        <div class="bg-secondary p-1">
          <label for="customFileLang">Add Cover Photo</label>
          <div class="custom-file">
            <input
              type="file"
              accept="image/*"
              class="custom-file-input {errors.coverPicId.message ? ' is-invalid' : 'valid'}"
              on:change={uploadCoverImage}
              id="customFileLang"
              lang="en" />
            <label class="custom-file-label" for="customFileLang">
              Select file
            </label>
          </div>
          <small class="error-text">{errors.coverPicId.message}</small>

          {#if formData.coverPicId.length > 0}
            <div class="card-thumbs">
              <div class="card card-thumbnail">
                <img
                  class="card-img-top"
                  src={formData.coverImagePreview}
                  alt=""
                  height="100px" />
              </div>
            </div>
          {/if}
        </div>

        <div class="bg-secondary p-1">
          <label for="customFileLang">Add Gallery (upto 3 max)</label>
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="customFileLang"
              multiple
              lang="en"
              accept="image/*"
              on:change={uploadGallery} />
            <label class="custom-file-label" for="customFileLang">
              Select files
            </label>
          </div>
          <small class="error-text">{errors.galleryIds.message}</small>

          {#if formData.galleryIds.length > 0}
            <div class="card-thumbs">
              {#each Object.keys(galleryPreviews) as key}
                <div class="card card-thumbnail">
                  <button on:click={() => removeGallery(key)}>
                    <i class="ni ni-fat-remove " />
                  </button>
                  <img
                    class="card-img-top"
                    src={galleryPreviews[key]}
                    alt=""
                    height="100px" />
                </div>
              {/each}
            </div>
          {/if}

        </div>
        <NotificationAlert />
        <Spinner visibility={loader} />
        <button type="submit" class="btn btn-primary">Submit</button>

      </div>
    </div>

  </form>

</DashboardLayout>

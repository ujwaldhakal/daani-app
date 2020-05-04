<script>
  import {stores} from '@sapper/app';
  import {loadCategories, update,verifyOwnership} from './../../../../entity/product'
  import {onMount} from 'svelte';
  import axios from 'axios';
  import DashboardLayout from '../../../../layout/dashboard.svelte'
  import NotificationAlert from './../../../../components/utils/notification/alert.svelte'
  import {NOTIFICATION, SUCCESS, ERROR} from './../../../../services/store'
  // import {verifyOwnership} from './../../../../entity/product'

  const {page} = stores();

  const slug = $page.params.slug;


  let product = {};
  let errors = {
    status: false,
    name: {
      message: '',
    },
    catId: {
      message: '',
    },
    coverPicId: {
      message: '',
    },
    galleryIds: {
      message: '',
    },
    usedFor: {
      message: '',
    },
    description: {
      message: '',
    }
  }

  let galleryPreviews = {};

  let initialFormData = {
    name: '',
    categories: [],
    subCategories: [],
    subCatId: 0,
    catId: 1,
    coverImagePreview: '',
    coverPicId: 0,
    galleryIds: 0,
    usedFor: '',
    coverPic: 0,

  };

  let formData = initialFormData

  function resetForm() {
    formData = initialFormData;
  }

  let id ="1";
  let value = 1;



  onMount(async () => {

    let res = await loadCategories()
    if (res.error) {
      return true;
    }

    formData.categories = res;
    product = await verifyOwnership(slug);
    if(product) {

      formData.name = product.name
      formData.catId = product.cat_id
      formData.description = product.description

      product.media.map((media) => {

        if(media.category === 'cover_image') {
          formData.coverImagePreview = media.path;
          formData.coverPicId = media.id;
          return;
        }
        formData.galleryIds += ','+media.id;
        galleryPreviews[media.id] = media.path;
      })


      if(product.category.parent_id > 0 ) {
        processCategory(product.category.parent_id);
        formData.catId = product.category.parent_id;
        formData.subCatId = product.category.id;
      }
    }


    formData.categories = res;
  })


  const selectCategory = (e) => {

    formData.catId = e.target.value
      processCategory(formData.catId);
  }

  const processCategory = (catId) => {
    let processedCategories = [];
    formData.categories.filter((item) => {
      if (item.parent_id == catId) {
        processedCategories.push(item);
      }
    })

    console.log("waht we got ass",processedCategories)

    formData.subCategories = processedCategories
  }

  function selectSubCategory(e) {
    formData.subCatId = e.target.value
  }

  async function uploadGallery(e) {

    console.log(e.target.files);
    if(e.target.files.length > 3) {

      let message = "You can only upload 3 photos max only";
      errors.galleryIds.message = message;

      return true;
    }

    try {
      const localFormData = new FormData()

      for (let i = 0; i < e.target.files.length; i++) {

        // galleryPreviews.push(URL.createObjectURL(e.target.files[i]))
        localFormData.append(
                'files[]',
                e.target.files[i]
        )

      }

      localFormData.append(
              'subject_type',
              'product',
      )

      localFormData.append(
              'category',
              'gallery',
      )
      let url = 'https://graphql.pagevamp.pv/' + 'api/media';
      let res = await axios.post(url, localFormData);
      if (res.data.status === "success") {
        galleryPreviews = res.data.data
        formData.galleryIds = Object.keys(galleryPreviews).toString();

        console.log("okn now", formData.galleryIds)
      }


    } catch
            (e) {
      console.log(e);
    }

  }

  async function uploadCoverImage(e) {


    formData.coverImagePreview = URL.createObjectURL(e.target.files[0]);

    try {
      let targetFile = e.target.files
      const localFormData = new FormData()

      // console.log("yeah length need",e.target.length);
      for (let i = 0; i < e.target.files.length; i++) {
        localFormData.append(
                'files[]',
                e.target.files[i]
        )

        localFormData.append(
                'subject_type',
                'product',
        )

        localFormData.append(
                'category',
                'cover_image',
        )
        let url = 'https://graphql.pagevamp.pv/' + 'api/media';
        let res = await axios.post(url, localFormData);
        if (res.data.status === "success") {
          formData.coverPicId = Object.keys(res.data.data)[0]
          console.log("getting form control",formData);
        }
      }
    } catch
            (e) {
      console.log(e);
    }
  }

  async function submit(e) {

    errors.status = false;
    console.log(formData);
    e.preventDefault();

    if (e.target.name.value == '') {
      errors.status = true;
      errors.name.message = "Please enter product name!"
    }

    if (e.target.catId.value == '') {
      errors.status = true;
      errors.catId.message = "Please select category!"
    }

    if (e.target.description.value == '') {
      errors.status = true;
      errors.description.message = "Enter description about product, location, contact etc !"
    }


    if (formData.coverPicId == 0) {
      errors.status = true;
      errors.coverPicId.message = "Select at least one cover image"
    }

    if (errors.status) {
      return true;
    }


    const res = await update(product.id,formData);

    console.log("geetting thawts",res);

    NOTIFICATION.update(() => {
      return {
        type: res.error ? ERROR : SUCCESS,
        message: res.error ? res.error : 'Updated successfully'
      }
    })

    resetForm();

  }

  const removeGallery = (id) => {
    let galleryIds = formData.galleryIds.split(',');

    formData.galleryIds = galleryIds.filter((existingId) => {
      if (existingId !== id) {
        return id;
      }
    }).toString();

    delete galleryPreviews[id];
    galleryPreviews = galleryPreviews

  }
</script>

<DashboardLayout>
  <div class="row">

    <form on:submit={submit}>

      <div class="card">

        <div class="card-header bg-transparent">
          <div class="row align-items-center">
            <div class="col">
              <h6 class="text-uppercase text-muted ls-1 mb-1">Fill out all the information below to donate</h6>
            </div>
          </div>
        </div>
        <div class="card-body">
          <NotificationAlert/>
          <div class="bg-secondary p-1">
            <label for="exampleFormControlInput1">Product Name</label>
            <input type="text"
                   class="form-control form-control-alternative {errors.name.message ? ' is-invalid' : 'valid'}"
                   name="name"
                   placeholder="Product Name" bind:value={formData.name}>
            <small class="error-text"> {errors.name.message}</small>
          </div>
          <div class="bg-secondary p-1">
            <label for="exampleFormControlInput1">Select Category</label>
            <select class="form-control {errors.catId.message ? ' is-invalid' : 'valid'}"
                    name="catId" on:change={selectCategory} id="exampleFormControlSelect1">
              <option value=''>Please select category </option>
              {#each formData.categories as category}
                {#if !category.parent_id}
                  <option value={category.id} selected={category.id == formData.catId }>{category.name}</option>
                {/if}
              {/each}
            </select>
            <small class="error-text"> {errors.catId.message}</small>
          </div>

          {#if product.id && formData.subCategories.length > 0}
            <div class="bg-secondary p-1">
              <label for="exampleFormControlInput1">Select Sub Category</label>
              <select class="form-control {errors.catId.message ? ' is-invalid' : 'valid'}"
                      value={formData.catId}
                      on:change={selectSubCategory}>
                id="exampleFormControlSelect1">
                <option value=''>Please select category</option>
                {#each formData.subCategories as category}
                  <option value={category.id} selected={category.id == formData.subCatId }
                  >{category.name}</option>
                {/each}
              </select>
              <small class="error-text"> {errors.catId.message}</small>
            </div>
          {/if}

          <div class="bg-secondary p-1">
            <label for="exampleFormControlInput1">Description</label>
            <textarea class="form-control"
                      id="exampleFormControlTextarea1 {errors.description.message ? ' is-invalid' : 'valid'}" rows="3"
                      name="description"
                      bind:value={formData.description}></textarea>
            <small> {errors.description.message}</small>
          </div>

          <div class="bg-secondary p-1">
            <div class="custom-file">
              <label for="exampleFormControlInput1">Add Cover Photo</label>
              <input type="file" accept="image/*" class="custom-file-input {errors.coverPicId.message ? ' is-invalid' : 'valid'}"
                     on:change={uploadCoverImage}
                     id="customFileLang" lang="en">
              <label class="custom-file-label" for="customFileLang">Select file</label>
              <small class="error-text"> {errors.coverPicId.message}</small>
            </div>

            <div class="card" style="width: 10rem;">
              <img class="card-img-top" src={formData.coverImagePreview} alt="" width="100px" height="100px">
            </div>
          </div>

          <div class="bg-secondary p-1">
            <div class="custom-file">
              <label for="exampleFormControlInput1">Add Gallery (upto 5 max)</label>
              <input type="file" class="custom-file-input" id="customFileLang" multiple lang="en"
                     accept="image/*"
                     on:change={uploadGallery}>
              <label class="custom-file-label" for="customFileLang">Select files</label>
              <small>{errors.galleryIds.message}</small>
            </div>

            <div class="card" style="width: 5rem;">
              {#each Object.keys(galleryPreviews) as key}
                <button on:click={() => removeGallery(key)}><i class="ni ni-fat-remove "></i></button>
                <img class="card-img-top" src={galleryPreviews[key]} alt="" width="100px" height="100px">
              {/each}
            </div>

          </div>

          <button type="submit" class="btn btn-primary">Submit</button>

        </div>
      </div>

    </form>
  </div>
</DashboardLayout>

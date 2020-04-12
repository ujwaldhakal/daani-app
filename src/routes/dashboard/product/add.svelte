<script>
  import Header from '../../../components/header.svelte'
  import Footer from '../../../components/footer.svelte'
  import {loadCategories,add} from './../../../entity/product'
  import {onMount} from 'svelte';
  import axios from 'axios';

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


  let formData = {
    name :'',
    categories:[],
    subCategories: [],
    subCatId: 0,
    catId:0,
    coverImagePreview: '',
    galleryPreviews:[],
    coverPicId: 0,
    galleryIds: 0,
    usedFor :'',
    coverPic : 0,


  };


  onMount(async () => {
    let res = await loadCategories()
    if (res.error) {
      return true;
    }

    formData.categories = res;
  })

  function selectCategory(e) {

    formData.catId = e.target.value
    let processedCategories = [];
    formData.categories.filter((item) => {
      if (item.parent_id == formData.catId) {
        processedCategories.push(item);
      }
    })

    formData.subCategories = processedCategories
  }

  function selectSubCategory(e) {
    formData.subCatId = e.target.value
  }

  async function uploadGallery(e) {

    let galleryPreviews = []

    try {
      console.log(e.target.files);
      const localFormData = new FormData()

      for (let i = 0; i < e.target.files.length; i++) {

        galleryPreviews.push(URL.createObjectURL(e.target.files[i]))
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
        formData.galleryIds = res.data.data.toString()
      }


    } catch
            (e) {
      console.log(e);
    }
    formData.galleryPreviews = galleryPreviews;

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
          formData.coverPicId = res.data.data[0]
        }
      }
    } catch
            (e) {
      console.log(e);
    }
  }

  async function submit(e) {

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

    if (e.target.usedFor.value == '') {
      errors.status = true;
      errors.usedFor.message = "Enter how many years it has been used!"
    }

    if (formData.coverPicId == 0) {
      errors.status = true;
      errors.coverPicId.message = "Select at least one cover image"
    }

    if (errors.status) {
      return true;
    }


    await add(formData);


  }
</script>

<div class="container">
  <Header/>
  <div class="row">

    <form on:submit={submit}>
      <div class="form-group">
        <label for="exampleInputEmail1">Product Name</label>
        <input type="text" class="form-control {errors.name.message ? ' is-invalid' : 'valid'}" id="product"
               bind:value={formData.name}
               aria-describedby="name" name="name" placeholder="Product Name">
      </div>

      <div class="form-group">
        <label for="exampleFormControlSelect1">Category</label>
        <select class="form-control {errors.catId.message ? ' is-invalid' : 'valid'}" id="exampleFormControlSelect1"
                name="catId" on:change={selectCategory}>
          <option value=''>Please select category</option>
          {#each formData.categories as category}
            {#if !category.parent_id}
              <option value={category.id}>{category.name}</option>
            {/if}
          {/each}
        </select>
      </div>

      {#if formData.subCategories.length > 0}
        <div class="form-group">
          <label for="exampleFormControlSelect1">Select Sub Category</label>
          <select class="form-control " id="exampleFormControlSelect1" name="subCatId"
                  on:change={selectSubCategory}>
            {#each formData.subCategories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>
      {/if}

      <div class="form-group">
        <label for="exampleInputEmail1">Used for (years, months)</label>
        <input type="text" class="form-control {errors.usedFor.message ? ' is-invalid' : 'valid'}" name="usedFor"
               bind:value={formData.usedFor}
               id="product" aria-describedby="product"
               placeholder="Used for(years, months)">
      </div>


      <div class="form-group">
        <label for="exampleFormControlFile1">Upload Cover Image</label>
        <input type="file" class="form-control-file {errors.coverPicId.message ? ' is-invalid' : 'valid'}"
               id="exampleFormControlFile1" on:change={uploadCoverImage}>

        <div class="cover-preview">
          <img src={formData.coverImagePreview} alt="" width="100px" height="100px">
        </div>
      </div>

      <div class="form-group">
        <label for="exampleFormControlFile1">Upload Gallery</label>
        <input type="file" multiple class="form-control-file" id="exampleFormControlFile1" on:change={uploadGallery}>

        <div class="cover-preview">
          {#each formData.galleryPreviews as image}
            <img src={image} alt="" width="100px" height="100px">
          {/each}
        </div>
      </div>

      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <textarea class="form-control {errors.description.message ? ' is-invalid' : 'valid'}" name="description" id=""
                  bind:value={formData.description}
                  cols="40" rows="10"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>

  <Footer/>
</div>

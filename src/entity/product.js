import {gql} from "apollo-boost";
import {mutate, query} from "../services/graphql";
import {defaultErrorResponse} from "../services/error";


async function loadCategories() {

  const schema = gql`
    {
      product_categories{
        id,
        name,
        parent_id
      }
    }`;
  try {

    const res = await query(schema);

    if (res.data && res.data.product_categories) {
      return res.data.product_categories
    }

    if (res.errors && res.errors[0]) {

      return {error: res.errors[0].message}
    }

  } catch (e) {
    return defaultErrorResponse;
  }
}


async function add(formData) {

  const schema = gql`
    mutation addProduct($name: String!,$cat_id: Int!,$cover_image: Int!,$description: String!,$gallery_images: String, ){
      addProduct(input:{
        name: $name,
        cover_image:$cover_image,
        cat_id: $cat_id,
        description:$description,
        gallery_images:$gallery_images

      }) {
        id
      }
    }
  `;

  try {

    const res = await mutate(schema,
      {
        name: formData.name,
        cover_image: formData.coverPicId,
        description: formData.description,
        gallery_images: formData.galleryIds,
        cat_id: formData.subCatId ? formData.subCatId : formData.catId,
      }
    )

    if (res.data && res.data.addProduct) {
      return res.data.addProduct;
    }

    if (res.errors && res.errors[0]) {
      return {error: res.errors[0].message}
    }

  } catch (e) {
    return defaultErrorResponse;
  }
}


async function listProducts(currentPage, filters) {
  const schema = gql`
    query me($currentPage: Int,$limit: Int!,$filter : ProductFilter  ){
      me{
        id,
        products(page:$currentPage,first: $limit, filter: $filter){
          data{
            id,
            name,
            description,
            slug,
            is_available,
            category{
              name
            },
            media{
              id,
              path,
              category
            }
          },
          paginatorInfo{
            total,
            perPage,
            currentPage,
            lastPage
          }
        }
      }
    }
  `;
  try {
    let variables = {
      currentPage: currentPage,
      limit: 10
    };

    if (filters !== undefined) {
      variables.filter = filters;
    }
    const res = await query(schema, variables);


    if (res.data && res.data.me.products && res.data.me.products.data.length > 0) {

      return res.data.me.products;
    }

    if (res.errors && res.errors[0]) {
      return {error: res.errors[0].message}
    }

  } catch (e) {

    console.log(e);

    return defaultErrorResponse;
  }
}


async function sold(id) {

  const schema = gql`
    mutation sold($id: ID!){
      sold(id: $id) {
        id
      }
    }
  `;
  try {

    const response = await mutate(schema, {id: id})

    if (response.errors && response.errors[0]) {

      return {error: response.errors[0].message}
    }

    return response.data.sold;

  } catch (e) {

    return defaultErrorResponse;
  }
}


async function destroy(id) {

  const schema = gql`
    mutation deleteProduct($id: ID!){
      deleteProduct(id: $id) {
        id
      }
    }
  `;

  try {

    const response = await mutate(schema, {id: id});

    if (response.errors && response.errors[0]) {

      return {error: response.errors[0].message}
    }

    return response.data.deleteProduct;
  } catch
    (e) {
    return defaultErrorResponse;
  }
}


async function loadAllPublicProducts(currentPage, filters,fields) {

  const extraFields  = fields !== undefined ? fields : '';
  const schema = gql`
    query products($currentPage: Int,$limit: Int!,$filter : ProductFilter  ){
      products(page:$currentPage,first: $limit, filter: $filter){
        data{
          id,
          name,
          description,
          slug,
          is_available,
          category{
            name
          },
          ${extraFields},
          media{
            id,
            path,
            category
          }
        },
        paginatorInfo{
          total,
          perPage,
          currentPage,
          lastPage
        }
      }
    }
  `;

  try {
    let variables = {
      currentPage: currentPage,
      limit: 9
    };

    if (filters !== undefined) {
      variables.filter = filters;
    }
    const res = await query(schema, variables);


    if (res.data && res.data.products && res.data.products.data.length > 0) {

      return res.data.products;
    }

    if (res.errors && res.errors[0]) {
      return {error: res.errors[0].message}
    }

  } catch (e) {

    console.log(e);

    return defaultErrorResponse;
  }

}


async function verifyOwnership(slug) {
  const schema = gql`
    query verifyProductOwnership($slug: String!){
      verifyProductOwnership(slug:$slug){
        id,
        name,
        slug,
        cat_id,
        category {
          id,parent_id
        },
        media {
          id,
          path,
          category
        }
        description
      }
    }
  `
  try {
    let res = await query(schema, {
      slug: slug
    });

    if (res.data && res.data.verifyProductOwnership) {
      return res.data.verifyProductOwnership;
    }

    return false;

  } catch (e) {

    console.log(e);
    throw new Error(e);
  }
}


async function update(id, formData) {
  try {
    const schema = gql`
      mutation updateProduct($id: ID!,$name: String!,$cat_id: Int!,$cover_image: Int!,$description: String!,$gallery_images: String!){
        updateProduct(
          id: $id,
          input:{
            name: $name,
            cover_image:$cover_image,
            cat_id: $cat_id,
            description:$description,
            gallery_images:$gallery_images
          }) {
          id
        }
      }
    `
    const res = await mutate(schema,
      {
        id: id,
        name: formData.name,
        cover_image: formData.coverPicId,
        description: formData.description,
        gallery_images: formData.galleryIds,
        cat_id: formData.subCatId ? formData.subCatId : formData.catId,
      })

    if (res.errors && res.errors[0]) {
      return {error: res.errors[0].message}
    }

    if (res.data && res.data.updateProduct) {
      return res.data.updateProduct;
    }


  } catch (e) {
    return defaultErrorResponse
  }
}


async function productBySlug(){

}

export {loadCategories, add, listProducts, sold, destroy, loadAllPublicProducts, verifyOwnership, update}

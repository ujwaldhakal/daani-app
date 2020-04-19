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
    mutation addProduct($name: String!,$cat_id: Int!,$cover_image: Int!,$description: String!,$gallery_images: String, $used_for: String!){
      addProduct(input:{
        name: $name,
        cover_image:$cover_image,
        cat_id: $cat_id,
        description:$description,
        gallery_images:$gallery_images
        used_for: $used_for

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
        used_for: formData.usedFor
      })

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


async function listProducts(currentPage,filters) {
  console.log("calling",{
    page: currentPage,
    filter: filters
  })
  const schema = gql`
    query me($currentPage: Int,$limit: Int! ){
      me{
        id,
        products(page:$currentPage,first: $limit){
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

    if(filters !== undefined) {
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


export {loadCategories, add, listProducts, sold, destroy}

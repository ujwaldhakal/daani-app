import {gql} from "apollo-boost";
import {mutate, query} from "svelte-apollo";
import client from "../services/graphql";
import {defaultErrorResponse} from "../services/error";

async function loadCategories() {

  try {

    let res = await query(client, {
      query: gql`
        {
          product_categories{
            id,
            name,
            parent_id
          }
        }`,
      errorPolicy: "all",
    }).result();

    if (res.data && res.data.product_categories) {
      return res.data.product_categories
    }

    if (res.errors && res.errors[0]) {

      return {error: res.errors[0].message}
    }

  } catch (e) {
    console.log("error", e);
    return defaultErrorResponse;
  }
}


async function add(formData) {

  try {

    let response = await mutate(client, {
      errorPolicy: "all",
      mutation: gql`
        mutation addProduct($name: String!,$cat_id: Int!,$cover_image: Int!,$description: String!,$gallery_images: String!, $used_for: String!){
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
      `,
      variables: {
        name: formData.name,
        cover_image: formData.coverPicId,
        description: formData.description,
        gallery_images: formData.galleryIds,
        cat_id: formData.subCatId ? formData.subCatId : formData.catId,
        used_for: formData.usedFor

      }
    })


  } catch (e) {
    console.log(e);
  }
}

export {loadCategories, add}

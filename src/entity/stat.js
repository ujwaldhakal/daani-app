import {gql} from "apollo-boost";
import {query} from "../services/graphql";
import {defaultErrorResponse} from "../services/error";

async function stat() {

  try {
    const SCHEMA = gql`{stat{
      total_products,
      total_sold_products,
      total_users
    }}`

    const res = await query(SCHEMA);

    if (res.data && res.data.stat) {
      return res.data.stat;
    }

    return {error: res.errors[0].message}
  } catch (e) {

    return defaultErrorResponse;
  }
}

export {stat}

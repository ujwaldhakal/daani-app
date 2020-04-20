import {gql} from "apollo-boost";
import {mutate} from "../services/graphql";
import {defaultErrorResponse} from "../services/error";

const USER_FIELDS = {
  'id': 0,
  'email': false,
  'name': false,
  'phone_number': false,
  'address': false,
}


const ME = gql`{
  me{
    id,
    email,
    name,
    phone_number,
    address
  } } `;

async function update(data) {
  try {

    const schema = gql`
      mutation updateUser($name: String,$phone_number: String,$address: String,$password: String){
        updateUser(data:{
          name: $name,
          phone_number:$phone_number,
          address: $address,
          password: $password,

        }) {
          id
        }
      }
    `;
    const res = await mutate(schema, data)

    if (res.errors && res.errors[0]) {
      return {error: res.errors[0].message}
    }

    return res.data.updateUser;

  } catch (e) {

    return defaultErrorResponse;
  }
}


export {USER_FIELDS, ME, update}

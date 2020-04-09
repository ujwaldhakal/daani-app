import {gql} from "apollo-boost";

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


export {USER_FIELDS, ME}

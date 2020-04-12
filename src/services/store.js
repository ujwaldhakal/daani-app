import {writable} from 'svelte/store';

import {USER_FIELDS} from "../entity/user";

export const CURRENT_USER = writable(USER_FIELDS);


export const NOTIFICATION = writable({
  type: '',
  message: ''
});

export const SUCCESS = 'success';
export const ERROR = 'danger';

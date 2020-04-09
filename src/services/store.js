import {writable} from 'svelte/store';

import {USER_FIELDS} from "../entity/user";

export const CURRENT_USER = writable(USER_FIELDS);

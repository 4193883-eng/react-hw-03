import {createAction} from "@reduxjs/toolkit";

export const createContactAction = createAction('@contacts/create')
export const removeContactAction = createAction('@contacts/remove')
export const flushContactsAction = createAction('@contacts/flush')

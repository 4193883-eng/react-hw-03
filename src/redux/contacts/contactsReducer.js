import {createReducer} from '@reduxjs/toolkit';
import {createContactAction, removeContactAction} from "./contactsActions.js";

const initialState = []

export const contactsReducer = createReducer(initialState, (builder) => {
    builder.addCase(createContactAction, (state, action) => {
        return [...state, action.payload]
    })
        .addCase(removeContactAction, (state, action) => {
            return state.filter((contact) => contact.id !== action.payload)
        })
})

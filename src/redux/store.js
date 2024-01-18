import {configureStore} from "@reduxjs/toolkit";
import {contactsReducer} from "./contacts/contactsReducer.js";

export const store = configureStore({
    reducer: {
        contacts: contactsReducer
    }
})

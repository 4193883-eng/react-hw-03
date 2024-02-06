import {useState} from 'react'
import {Heading, Stack, Text} from '@chakra-ui/react'
import {ContactForm} from './components/ContactForm/ContactForm.jsx'
import {Filter} from './components/Filter/Filter.jsx'
import {ContactList} from './components/ContactList/ContactList.jsx'
import {useDispatch, useSelector} from "react-redux";
import {createContactAction, removeContactAction} from "./redux/contacts/contactsActions.js";
import {nanoid} from "@reduxjs/toolkit";
import {contactsSelector} from "./redux/contacts/contactsSelectors.js";
// import loadData from './localStorageHelper.js'
// import {
//     createContactService,
//     getAllContactsService,
//     removeContactService,
// } from './apiService.js'

export default function App() {
    const contacts = useSelector(contactsSelector)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState('')

    // useEffect(() => {
    //     getAllContactsService().then((res) => {
    //         setContacts(res.data)
    //     })
    // }, [])
    //
    // useEffect(() => {
    //     localStorage.setItem('data', JSON.stringify(contacts))
    // }, [contacts])

    function addContactHandler(name, number) {
        if (isNameAlreadyInUse(name)) {
            return
        }

        if (name === '') {
            return
        }

        dispatch(createContactAction(
            {
                name: name,
                id: nanoid(),
                number: number
            }
        ))
        // createContactService(name, number).then((res) => {
        //     setContacts((prevContacts) => {
        //         return [...prevContacts, res.data]
        //     })
        // })
    }

    function isNameAlreadyInUse(name) {
        return contacts.some((contact) => contact.name === name)
    }

    function filterChangeHandler(e) {
        setFilter(e.target.value)
    }

    function removeHandler(id) {
        console.log('removed', id)
        dispatch(removeContactAction(id))
    }

    return (
        <Stack spacing={4} ml={8} mt={4} mr={8} maxW={500}>
            <Heading>Phone Book</Heading>
            <ContactForm
                addContactHandler={addContactHandler}
                isNameAlreadyInUse={isNameAlreadyInUse}
            />
            <Text fontSize={'2xl'}>Contacts</Text>
            <Filter filter={filter} filterChangeHandler={filterChangeHandler}/>
            <ContactList
                contacts={contacts}
                filter={filter}
                removeHandler={removeHandler}
            />
        </Stack>
    )
}

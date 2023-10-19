import { useEffect, useState } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { ContactForm } from './components/ContactForm/ContactForm.jsx'
import { Filter } from './components/Filter/Filter.jsx'
import { ContactList } from './components/ContactList/ContactList.jsx'
import loadData from './localStorageHelper.js'
import {
    createContactService,
    getAllContactsService,
    removeContactService,
} from './apiService.js'

export default function App() {
    const [contacts, setContacts] = useState(loadData)

    const [filter, setFilter] = useState('')

    useEffect(() => {
        getAllContactsService().then((res) => {
            setContacts(res.data)
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(contacts))
    }, [contacts])

    function addContactHandler(name, number) {
        if (isNameAlreadyInUse(name)) {
            return
        }

        if (name === '') {
            return
        }

        createContactService(name, number).then((res) => {
            setContacts((prevContacts) => {
                return [...prevContacts, res.data]
            })
        })
    }

    function isNameAlreadyInUse(name) {
        return contacts.some((contact) => contact.name === name)
    }

    function filterChangeHandler(e) {
        setFilter(e.target.value)
    }

    function removeHandler(id) {
        setContacts((prevContacts) => {
            removeContactService(id)
            return prevContacts.filter((contact) => contact.id !== id)
        })
    }

    return (
        <Stack spacing={4} ml={8} mt={4} mr={8} maxW={500}>
            <Heading>Phone Book</Heading>
            <ContactForm
                addContactHandler={addContactHandler}
                isNameAlreadyInUse={isNameAlreadyInUse}
            />
            <Text fontSize={'2xl'}>Contacts</Text>
            <Filter filter={filter} filterChangeHandler={filterChangeHandler} />
            <ContactList
                contacts={contacts}
                filter={filter}
                removeHandler={removeHandler}
            />
        </Stack>
    )
}

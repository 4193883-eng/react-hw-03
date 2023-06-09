import { useEffect, useState } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { ContactForm } from './components/ContactForm/ContactForm.jsx'
import { Filter } from './components/Filter/Filter.jsx'
import { ContactList } from './components/ContactList/ContactList.jsx'
import loadData from './localStorageHelper.js'

export default function App() {
    const [contacts, setContacts] = useState(loadData)

    const [filter, setFilter] = useState('')

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

        setContacts((prevContacts) => {
            return [
                ...prevContacts,
                {
                    name: name,
                    number: number,
                    id: nanoid(),
                },
            ]
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
            return prevContacts.filter((contact) => contact.id !== id)
        })
    }

    return (
        <Stack spacing={4} ml={8} mt={4} mr={8}>
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

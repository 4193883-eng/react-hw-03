import {useState} from "react";
import {Heading, Stack, Text} from "@chakra-ui/react";
import {nanoid} from "nanoid";
import {ContactForm} from "./components/ContactForm/ContactForm.jsx";
import {Filter} from "./components/Filter/Filter.jsx";
import {ContactList} from "./components/ContactList/ContactList.jsx";

export default function App() {

    const [contacts, setContacts] = useState([
        {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
        {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
        {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
        {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ]);

    const [filter, setFilter] = useState('');

    function addContactHandler(name, number) {

        if(isNameAlreadyInUse(name)){
            return;
        }

        if(name === ''){
            return;
        }

        setContacts((prevContacts) => {
            return [...prevContacts, {
                name: name,
                number: number,
                id: nanoid(),
            }]
        })
    }

    function isNameAlreadyInUse(name){
        return contacts.some((contact) => contact.name === name);
    }

    function filterChangeHandler(e) {
        setFilter(e.target.value)
    }

    function removeHandler(id) {
        setContacts((prevContacts) => {
            return prevContacts.filter((contact) => contact.id !== id);
        });
    }

    return (
        <Stack spacing={4} ml={8} mt={4} mr={8}>
            <Heading>Phone Book</Heading>
            <ContactForm addContactHandler={addContactHandler} isNameAlreadyInUse={isNameAlreadyInUse}/>
            <Text fontSize={"2xl"}>Contacts</Text>
            <Filter filter={filter} filterChangeHandler={filterChangeHandler}/>
            <ContactList contacts={contacts} filter={filter} removeHandler={removeHandler}/>
        </Stack>
    );
}
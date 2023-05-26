import {Button, ListItem, UnorderedList} from "@chakra-ui/react";

export function ContactList({ contacts, filter, removeHandler }) {
	function search(contacts){
		if (filter == ""){return contacts}
		return contacts.map((contact) => {
			const lowerName = contact.name.toLowerCase()
			const lowerQuery = filter.toLowerCase()
			if(lowerName.includes(lowerQuery)){
				return contact
			}
		})
	}

	return (
		<UnorderedList>
			{search(contacts).map((contact) =>
			{if(contact) { return <ListItem h={"fit-content"} key={contact.id}>{contact.name}: +380-{contact.number} <Button h={"90%"} onClick={() => {removeHandler(contact.id); console.log(contact.id)}} >Remove</Button></ListItem>}})
			}
		</UnorderedList>
	)
}
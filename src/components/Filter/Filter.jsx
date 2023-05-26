import {Input} from "@chakra-ui/react";

export function Filter({filter, filterChangeHandler}) {
	return (
		<Input
			type="text"
			name="name"
			value={filter}
			placeholder={"Search"}
			onChange={filterChangeHandler}
			pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
			title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
			required
			maxW={512}
		/>
	)
}
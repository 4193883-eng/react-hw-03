import {
	Button,
	Input,
	InputGroup,
	InputLeftAddon,
	Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
	PopoverContent, PopoverHeader,
	PopoverTrigger,
	Stack
} from "@chakra-ui/react";
import {useState} from "react";

export function ContactForm({ addContactHandler, isNameAlreadyInUse }) {
	const [name, setName] = useState('');
	const [number, setNumber] = useState('');
	const [showPopover, setShowPopover] = useState(false); // New state

	function nameChangeHandler(e) {
		setName(e.target.value);
		setShowPopover(false); // Reset the popover when the name input changes
	}

	function numberChangeHandler(e) {
		setNumber(e.target.value);
	}

	function handleAddContact() {
		if (isNameAlreadyInUse(name)) {
			setShowPopover(true); // Show the popover if the name already exists
		} else {
			addContactHandler(name, number);
			setName('');
			setNumber('');
		}
	}

	return (
		<Stack w={'100%'} maxw={512} borderWidth={1} p={8} borderRadius={8}>
			{/* Name Input */}
			<Input
				type="text"
				name="name"
				value={name}
				placeholder="Name"
				onChange={nameChangeHandler}
				required
			/>

			{/* Phone Input */}
			<InputGroup>
				<InputLeftAddon children="+380" />
				<Input
					type="tel"
					name="number"
					value={number}
					placeholder="Phone"
					onChange={numberChangeHandler}
					required
				/>
			</InputGroup>

			{/* Popover */}
			<Popover isOpen={showPopover}>
				<PopoverTrigger>
					<Button onClick={handleAddContact}>Add contact</Button>
				</PopoverTrigger>
				<PopoverContent>
					<PopoverArrow />
					<PopoverCloseButton onClick={()=> {
						setShowPopover(false)
						setNumber('')
						setName('')
					}}/>
					<PopoverHeader>Name already exists!</PopoverHeader>
					<PopoverBody>You cannot add another contact with the same name!</PopoverBody>
				</PopoverContent>
			</Popover>
		</Stack>
	);
}

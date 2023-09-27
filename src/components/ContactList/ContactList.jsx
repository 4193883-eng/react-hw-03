import { Button, ListItem, UnorderedList } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

const MotionListItem = motion(ListItem)
const MotionButton = motion(Button)

export function ContactList({ contacts, filter, removeHandler }) {
    function search(contacts) {
        if (filter == '') {
            return contacts
        }
        return contacts.map((contact) => {
            const lowerName = contact.name.toLowerCase()
            const lowerQuery = filter.toLowerCase()
            if (lowerName.includes(lowerQuery)) {
                return contact
            }
        })
    }

    return (
        <UnorderedList>
            <AnimatePresence>
                {search(contacts).map((contact) => {
                    if (contact) {
                        return (
                            <MotionListItem
                                h={'fit-content'}
                                key={contact.id}
                                initial={{
                                    opacity: 0,
                                    translateX: '100%',
                                    animation: 'ease-out',
                                }}
                                animate={{
                                    opacity: 1,
                                    translateX: 0,
                                    animation: 'ease-out',
                                }}
                                exit={{
                                    opacity: 0,
                                    translateX: '-100%',
                                    animation: 'ease-out',
                                }}
                                transition={{
                                    duration: 0.5,
                                    animation: 'ease-out',
                                }}
                            >
                                {contact.name}: +380-{contact.number}
                                <MotionButton
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    h={'90%'}
                                    m={5}
                                    onClick={() => {
                                        setTimeout(() => {
                                            removeHandler(contact.id)
                                        }, 100)
                                    }}
                                >
                                    Remove
                                </MotionButton>
                            </MotionListItem>
                        )
                    }
                })}
            </AnimatePresence>
        </UnorderedList>
    )
}

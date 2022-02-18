import { useEffect } from 'react'

import { BiCog } from 'react-icons/bi'
import {
    IconButton,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Select,
    Flex,
    Heading,
    Text,
    HStack,
} from '@chakra-ui/react'
import { ConfigBox } from './ConfigBox'
import { graphQLClient } from '../pages/api/graphql'
import { useMovie } from '../hooks/useMovie'

export function Config() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userLocation } = useMovie()

    useEffect(() => {
        console.log(userLocation)
        graphQLClient.executeOperation({
            query: `
                {
                    allWatchProviders(region: "${userLocation.locale}") {
                        provider_name
                        logo_path
                        provider_id
                    }
                }
            `
        })
        .then(({ data }) => {
            console.log(data.allWatchProviders)
        })
        .catch(err => {
            console.error(err)
        })
    }, [userLocation])

    return (
        <>
            <IconButton
                onClick={onOpen}
                bg="transparent"
                _hover={{ bg: "dark.600" }}
                w="45px"
                h="45px"
                borderRadius="50%"
                aria-label="Open Configurations"
            >
                <BiCog size={24} />
            </IconButton>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                preserveScrollBarGap
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Config</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ConfigBox
                            title="Language"
                            description="select your favorite language"
                        >
                            <Select>
                                <option value="pt">🇧🇷 Portuguese</option>
                                <option value="en">🇺🇸 English</option>
                                <option value="fr">🇫🇷 French</option>
                                <option value="de">🇩🇪 German</option>
                            </Select>
                        </ConfigBox>
                        <ConfigBox
                            title="Platforms"
                            description="choose from which platforms you want to watch"
                        >
                            <HStack>
                                <Button>All</Button>
                                <Button>None</Button>
                            </HStack>
                            <HStack>

                            </HStack>
                        </ConfigBox>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
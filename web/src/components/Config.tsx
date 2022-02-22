import { ChangeEvent, useEffect, useState, memo } from 'react'
import { useRouter } from 'next/router'

import { setCookie } from 'nookies'
import lookup from 'country-code-lookup'

import { ConfigBox } from './ConfigBox'
import { useMovie } from '../hooks/useMovie'
import { useConfig } from '../hooks/useConfig'
import { graphQLClient } from '../pages/api/graphql'

import { BiCog } from 'react-icons/bi'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
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
    HStack,
    Tooltip,
    Skeleton,
    Image,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
}

type Genre = {
    name: string,
    id: number,
}

export function Config() {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { userLocation, handleChangeUserLocation } = useMovie()
    const {
        providers,
        handleAddProvider,
        handleRemoveProvider,
        handleAddAllProviders,
        handleRemoveAllProviders,
    } = useConfig()
    const [allWatchProviders, setAllWatchProviders] = useState<Provider[]>([])
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        graphQLClient.executeOperation({
            query: `
                {
                    allWatchProviders(region: "${userLocation.countryCode}") {
                        provider_name
                        logo_path
                        provider_id
                    }
                }
            `
        })
        .then(({ data }) => {
            setAllWatchProviders(data.allWatchProviders)
        })
        .catch(err => {
            console.error(err)
        })

        graphQLClient.executeOperation({
            query: `
                {
                    genres {
                        name
                        id
                    }
                }
            `
        })
        .then(({ data }) => {
            setGenres(data.genres)
        })
        .catch(err => {
            console.error(err)
        })
    }, [userLocation])

    function addAllProviders() {
        const idList = allWatchProviders.map(provider => provider.provider_id)
        handleAddAllProviders(idList)
    }

    function handleChangeLanguage(e: ChangeEvent<HTMLSelectElement>) {
        const locale = e.currentTarget.value
        const { country, internet: countryCode } = lookup.byIso(locale)
        const newUserLocation = { country, countryCode, locale }

        handleChangeUserLocation(newUserLocation)
        setCookie(null, '@ibgm_user_location', JSON.stringify(newUserLocation))
        router.push('/', null, { locale })
    }

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
                <ModalContent pb="3rem">
                    <ModalHeader>Config</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDir="column" gridGap="1.8rem">
                            <ConfigBox
                                title="Language"
                                description="select your favorite language"
                            >
                                <Select onChange={handleChangeLanguage} defaultValue={userLocation.locale}>
                                    <option value="pt">🇧🇷 Portuguese</option>
                                    <option value="us">🇺🇸 English</option>
                                    <option value="fr">🇫🇷 French</option>
                                    <option value="de">🇩🇪 German</option>
                                </Select>
                            </ConfigBox>
                            <ConfigBox
                                title="Platforms"
                                description="choose from which platforms you want to watch"
                            >
                                <Flex flexDir="column" gridGap="1rem" w="100%">
                                    <HStack>
                                        <Button onClick={addAllProviders}>All</Button>
                                        <Button onClick={handleRemoveAllProviders}>None</Button>
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <IconButton
                                            variant="ghost"
                                            borderRadius="50%"
                                            aria-label="Left"
                                        >
                                            <FiArrowLeft size={20} />
                                        </IconButton>
                                        {allWatchProviders.splice(0, 5).map(provider => (
                                            <Tooltip
                                                key={provider.provider_id}
                                                label={provider.provider_name}
                                            >
                                                <Flex
                                                    borderRadius=".2rem"
                                                    overflow="hidden"
                                                    cursor="pointer"
                                                    lineHeight="0"
                                                    w="50px"
                                                    h="50px"
                                                >
                                                    <Image
                                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                                        width={50}
                                                        height={50}
                                                        alt={provider.provider_name}
                                                    />
                                                </Flex>
                                            </Tooltip>
                                        ))}
                                        <IconButton
                                            variant="ghost"
                                            borderRadius="50%"
                                            aria-label="Left"
                                        >
                                            <FiArrowRight size={20} />
                                        </IconButton>
                                    </HStack>
                                </Flex>
                            </ConfigBox>
                            <ConfigBox
                                title="Genre"
                                description="what kind of movie to watch today?"
                            >
                                <Flex flexDir="column" gridGap="1rem" w="100%">
                                    <HStack>
                                        <Button>All</Button>
                                        <Button>None</Button>
                                    </HStack>
                                    <HStack justifyContent="space-between">
                                        <IconButton
                                            variant="ghost"
                                            borderRadius="50%"
                                            aria-label="Left"
                                        >
                                            <FiArrowLeft size={20} />
                                        </IconButton>
                                        {genres.splice(0, 5).map(genre => (
                                            <Flex
                                                key={genre.id}
                                                w="50px"
                                                h="50px"
                                                p="2px"
                                                bg="secondary.300"
                                                wordBreak="break-word"
                                                borderRadius=".2rem"
                                                fontSize=".8rem"
                                                overflow="hidden"
                                            >
                                                {genre.name}
                                            </Flex>
                                        ))}
                                        <IconButton
                                            variant="ghost"
                                            borderRadius="50%"
                                            aria-label="Left"
                                        >
                                            <FiArrowRight size={20} />
                                        </IconButton>
                                    </HStack>
                                </Flex>
                            </ConfigBox>
                            <ConfigBox
                                title="Weirdometer"
                                description="control the weirdness of the movies"
                            >
                                <Slider aria-label="Weirdometer" defaultValue={400} max={400} step={100}>
                                    <SliderMark value={0} mt=".4rem" fontSize=".9rem" maxW="5rem">
                                        Very Normal
                                    </SliderMark>
                                    <SliderMark value={100} mt=".4rem" fontSize=".9rem" maxW="5rem" transform="auto" translateX="-50%">
                                        Normal
                                    </SliderMark>
                                    <SliderMark value={200} mt=".4rem" fontSize=".9rem" maxW="5rem" transform="auto" translateX="-50%">
                                        Balanced
                                    </SliderMark>
                                    <SliderMark value={300} mt=".4rem" fontSize=".9rem" maxW="5rem" transform="auto" translateX="-50%">
                                        Weird
                                    </SliderMark>
                                    <SliderMark value={400} mt=".4rem" fontSize=".9rem" maxW="5rem" transform="auto" translateX="-80%">
                                        Very Weird
                                    </SliderMark>
                                    <SliderTrack>
                                        <SliderFilledTrack bgGradient="linear(to-r, secondary.200, secondary.400)" />
                                    </SliderTrack>
                                    <SliderThumb />
                                </Slider>
                            </ConfigBox>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
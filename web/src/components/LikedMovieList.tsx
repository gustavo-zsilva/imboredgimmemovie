import { useRef } from 'react'

import { useMovie } from '../hooks/useMovie'
import { useAuth } from '../hooks/useAuth'
import { Button } from './Button'

import { BiGhost } from 'react-icons/bi'
import { AiOutlineDelete, AiOutlineFire } from 'react-icons/ai'
// import { motion } from 'framer-motion'
import {
    Flex,
    Text,
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogCloseButton,
    Button as ChakraButton,
    chakra,
} from '@chakra-ui/react'

export function LikedMovieList() {
    // const FactoryMotion = chakra(motion.div)

    const { likedMovies, handleChangeMovie, handleClearLikedMovies } = useMovie()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const { user } = useAuth()

    function handleClearMovies() {
        handleClearLikedMovies()
        onClose()
    }

    // const list = {
    //     visible: {
    //         opacity: 1,
    //         transition: {
    //             when: "beforeChildren",
    //             staggerChildren: 0.1,
    //         },
    //     },
    //     hidden: {
    //         opacity: 0,
    //         transition: {
    //             when: "afterChildren",
    //         },
    //     }
    // }

    // const item = {
    //     visible: {
    //         opacity: 1,
    //         y: 0,
    //     },
    //     hidden: {
    //         opacity: 0,
    //         y: -80
    //     },
    // }

    return (
        <Flex
            display="flex"
            flexDir="column"
            w="100%"
            maxH="32rem"
            gridGap="1.2rem"
            h="100%"
            overflowY="auto"
            position="relative"
            initial="hidden"
            animate="visible"
            // variants={list}
        >
            {!user && (
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                    h="100vh"
                    maxW="15rem"
                >
                    <AiOutlineFire size={32} />
                    <Text mt="1rem">
                        Login to have your movie list!
                    </Text>
                </Flex>
            )}

            {likedMovies.length <= 0 && user && (
                <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    m="auto"
                    h="100vh"
                    maxW="15rem"
                >
                    <BiGhost size={32} />
                    <Text textAlign="center" mt="1rem">
                        No favorite movies here.
                    </Text>
                </Flex>
            )}

            {likedMovies.length > 0 && likedMovies.map(movie => {
                return (
                    <Flex
                        key={movie.id}
                        display="flex"
                        pos="relative"
                        px="1rem"
                        borderRadius=".2rem"
                        overflow="hidden"
                        justifyContent="center"
                        alignItems="center"
                        minH="5rem"
                        cursor="pointer"
                        onClick={() => handleChangeMovie(movie)}
                        // variants={item}
                    >
                        <Flex
                            bgImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            bgPos="center"
                            bgSize="cover"
                            bgRepeat="no-repeat"
                            filter="blur(8px)"
                            w="100%"
                            pos="absolute"
                            top="0"
                            bottom="0"
                        />
                        <Text
                            bg="rgba(49, 47, 47, 0.6)"
                            zIndex="1"
                            p=".4rem"
                            borderRadius=".2rem"
                            h="fit-content"
                        >
                            {movie.title}
                        </Text>
                    </Flex>
                )
            })}

            <Flex
                position="sticky"
                bottom="0"
                p="0 8px 8px 0"
                alignSelf="flex-end"
                zIndex="2"
            >
                <Button
                    aria-label="Clear Liked Movies"
                    onClick={onOpen}
                    disabled={likedMovies.length <= 0}
                    bg="primary.400"
                    w="3.5rem"
                    h="3.5rem"
                    _hover={{ w: '4rem', h: '4rem' }}
                >
                    <AiOutlineDelete size={32} />
                </Button>

                <AlertDialog
                    leastDestructiveRef={cancelRef}
                    motionPreset="slideInBottom"
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                    preserveScrollBarGap
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Delete liked movies?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to discard all your liked movies?{' '}
                            {likedMovies.length} movie(s) will be deleted.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <ChakraButton ref={cancelRef} onClick={onClose}>
                                No
                            </ChakraButton>
                            <ChakraButton colorScheme="red" ml="1rem" onClick={handleClearMovies}>
                                Yes, delete them!
                            </ChakraButton>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </Flex>
        </Flex>
    )
}

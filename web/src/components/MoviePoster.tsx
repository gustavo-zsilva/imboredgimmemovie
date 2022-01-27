import { useState, useEffect } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'

import { BiGhost } from 'react-icons/bi'
import { Flex, Text, Button } from "@chakra-ui/react"

export function MoviePoster() {

    const { movie } = useMovie()
    const [isPosterShown, setIsPosterShown] = useState(false)

    useEffect(() => {
        setIsPosterShown(false)
    }, [movie])

    function handleShowPoster() {
        setIsPosterShown(!isPosterShown)
    }

    return (
        <Flex
            boxShadow="0 0 5px 5px rgba(0, 0, 0, 0.1)"
            p="6px"
            bg="transparent"
            borderRadius=".2rem"
            overflow="hidden"
            justifyContent="center"
            pos="relative"
        >
            <Flex
                bgImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                bgPos="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                filter="blur(10px)"
                w="100%"
                pos="absolute"
                top="0"
                bottom="0"
            />
            <Flex m=".4rem 0" pos="relative" justifyContent="center">
                {movie.adult && !isPosterShown &&
                    <Button
                        pos="absolute"
                        alignSelf="center"
                        zIndex="2"
                        flexDir="column"
                        variant="ghost"
                        h="fit-content"
                        p=".8rem .4rem"
                        onClick={handleShowPoster}
                    >
                        <Text fontSize="4rem">+18</Text>
                        <Text>click to see</Text>
                    </Button>}
                {movie.poster_path ? (
                    <Flex
                        filter={movie.adult && !isPosterShown && "blur(8px) brightness(0.7)"}
                        onClick={movie.adult ? handleShowPoster : null}
                        boxShadow="0 0 5px 5px rgba(0, 0, 0, 0.03)"
                    >
                        <Image
                            width={300}
                            height={445}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            objectFit="contain"
                        />
                    </Flex>
                ) : (
                    <Flex
                        w="300px"
                        h="445px"
                        bg="dark.100"
                        zIndex="9999"
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                        borderRadius=".2rem"
                    >
                        <BiGhost size={32} />
                        <Text>Poster not found</Text>
                    </Flex>
                )}
                
            </Flex>
        </Flex>
    )
}
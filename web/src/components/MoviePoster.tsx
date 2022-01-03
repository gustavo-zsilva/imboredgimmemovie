import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'

import { BiGhost } from 'react-icons/bi'
import { Flex, Text } from "@chakra-ui/react"

export function MoviePoster() {

    const { movie } = useMovie()

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
            <Flex m=".4rem 0">
                {movie.poster_path ? (
                    <Image
                        width={300}
                        height={445}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        objectFit="contain"
                    />
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
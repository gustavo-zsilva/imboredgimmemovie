import { BiGhost } from 'react-icons/bi'

import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function LikedMovieList() {

    const { likedMovies, handleChangeMovie } = useMovie()

    return (
        <Flex flexDir="column" w="100%" gridGap="1.2rem" h="100%" overflowY="scroll">

            {likedMovies.length > 0 ? likedMovies.map(movie => {
                return (
                    <Flex
                        key={movie.id}
                        pos="relative"
                        px="1rem"
                        borderRadius=".2rem"
                        overflow="hidden"
                        justifyContent="center"
                        alignItems="center"
                        minH="5rem"
                        cursor="pointer"
                        onClick={() => handleChangeMovie(movie)}
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
                            zIndex="9999"
                            p=".4rem"
                            borderRadius=".2rem"
                            h="fit-content"
                        >
                            {movie.title}
                        </Text>
                    </Flex>
                )
            }) : (
                <Flex flexDir="column" alignItems="center" m="auto" maxW="15rem">
                    <BiGhost size={32} />
                    <Text textAlign="center" mt="1rem">No favorite movie huh? I see, you are a tough one.</Text>
                </Flex>
            )}
            
        </Flex>
    )
}
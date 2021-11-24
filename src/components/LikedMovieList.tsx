import {
    Flex,
    Text,
} from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function LikedMovieList() {

    const { likedMovies } = useMovie()

    return (
        <Flex flexDir="column" w="100%" gridGap="1.2rem">

            {likedMovies.map(movie => {
                return (
                    <Flex
                        pos="relative"
                        p="1rem"
                        borderRadius=".2rem"
                        overflow="hidden"
                        justifyContent="center"
                        key={movie.id}
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
                            textAlign="left"
                        >
                            {movie.title}
                        </Text>
                    </Flex>
                )
            })}
            
        </Flex>
    )
}
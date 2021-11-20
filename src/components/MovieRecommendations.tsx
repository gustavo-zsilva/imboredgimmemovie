import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'

import { Flex, Heading, Text } from '@chakra-ui/react'

export function MovieRecommendations() {

    const { movieRecommendations, handleChangeMovie } = useMovie()

    return (
        <Flex gridArea="Recommendations" flexDir="column" mt={movieRecommendations.length > 0 && "4rem"}>
            {movieRecommendations.length > 0 &&
                <Heading as="h3" fontSize="1.4rem" display="flex" gridGap=".6rem" alignItems="baseline">
                    Recommendations for you
                    <Text color="gray.500" fontSize="1rem">{movieRecommendations.length}</Text>
                </Heading>}

            <Flex justifyContent="space-between" mt="2rem">
                {movieRecommendations.map(movie => {
                    return (
                        <Flex
                            key={movie.id}
                            flexDir="column"
                            maxW="200px"
                            
                            p=".2rem"
                            borderRadius=".2rem"
                            transition=".2s"
                            cursor="pointer"
                            _hover={{ bg: 'dark.200' }}
                            onClick={() => handleChangeMovie(movie)}
                        >
                            <Flex
                                bgImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                bgPos="center"
                                bgRepeat="no-repeat"
                                bgSize="contain"
                                width={200}
                                height={285}
                                alignSelf="center"
                            />

                            <Flex p=".6rem" borderRadius=".2rem" justifyContent="center" mt=".2rem">
                                <Text fontWeight="bold" >{movie.title}</Text>
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
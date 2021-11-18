import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'

import { Flex, Heading, Text } from '@chakra-ui/react'

export function MovieRecommendations() {

    const { movieRecommendations, handleChangeMovie } = useMovie()

    return (
        <Flex gridArea="Recommendations" flexDir="column" mt="4rem">
            <Heading as="h3" fontSize="1.4rem">Recommendations for you</Heading>

            <Flex justifyContent="space-between" mt="2rem">
                {movieRecommendations.map(movie => {
                    return (
                        <Flex
                            key={movie.id}
                            flexDir="column"
                            maxW="200px"
                            bg="primary.100"
                            p=".2rem"
                            borderRadius=".2rem"
                            boxShadow="0 0 3px 3px rgba(0, 0, 0, 0.03)"
                            transition=".2s"
                            cursor="pointer"
                            _hover={{ bg: 'primary.200' }}
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

                            <Flex p=".6rem" borderRadius=".2rem" justifyContent="center" mt=".2rem" bg="dark.200">
                                <Text fontWeight="bold" >{movie.title}</Text>
                            </Flex>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
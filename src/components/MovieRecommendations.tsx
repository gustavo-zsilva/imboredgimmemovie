import { useMovie } from '../hooks/useMovie'

import { Flex, Heading, Text, Grid } from '@chakra-ui/react'

export function MovieRecommendations() {

    const { movieRecommendations, handleChangeMovie } = useMovie()

    if (movieRecommendations.length <= 0) return null

    return (
        <Flex
            gridArea="Recommendations"
            flexDir="column"
            my="2rem"
        >
            <Heading
                as="h3"
                fontSize="1.4rem"
                display="flex"
                gridGap=".6rem"
                alignItems="baseline"
            >
                Recommendations for you
                <Text color="gray.500" fontSize="1rem">{movieRecommendations.length}</Text>
            </Heading>
            
            <Grid
                display={{ sm: "grid", lg: "flex" }}
                
                gridTemplateColumns="1fr 1fr"
                gridRowGap="1rem"
                justifyContent="space-between"
                mt="2rem"
            >
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
            </Grid>
        </Flex>
    )
}
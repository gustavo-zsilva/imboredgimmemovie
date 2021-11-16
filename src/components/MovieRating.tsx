import { Progress, Flex, Text } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function MovieRating() {
    const { movie } = useMovie()

    const ratingPercentage = movie.vote_average * 10

    return (
        <Flex w="85%" alignItems="center" textAlign="right">
            <Progress
                colorScheme="blue"
                size="lg"
                h="2rem"
                w="100%"
                bg="dark.200"
                value={ratingPercentage}
                borderRadius=".1rem"
            />
            <Flex flexDir="column">
                <Text fontSize="2.2rem">
                    {movie.vote_average}
                </Text>
                <Text fontSize=".8rem" transform="translateY(-10%)" filter="brightness(0.6)">
                    Average Rating
                </Text>
            </Flex>
        </Flex>
    )
}

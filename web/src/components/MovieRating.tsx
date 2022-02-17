import useMeasure from 'react-use-measure'

import { useMovie } from '../hooks/useMovie'
import { RatingMarker } from './RatingMarker'

import { Flex, Text } from '@chakra-ui/react'

export function MovieRating() {
    const { movie } = useMovie()
    const [ref, bounds] = useMeasure()

    const ratingPercentage = movie.vote_average * 10
    const rating = movie.vote_average.toFixed(1)

    const offset = (ratingPercentage / 100) * Math.floor(bounds.width)
    
    return (
        <Flex
            px={{ md: "1rem", lg: "3rem" }}
            mt={{ sm: "2.5rem", md: "initial" }}
            alignItems="center"
            textAlign="right"
            pos="relative"
        >
            <RatingMarker offset={offset} />
            <Flex
                h="2rem"
                w="100%"
                bg="dark.700"
                borderRadius=".1rem"
                ref={ref}
            >
                <Flex
                    w={`${ratingPercentage}%`}
                    bg="primary.100"
                    borderRadius=".1rem"
                />
            </Flex>
            <Flex flexDir="column">
                <Text fontSize="2.2rem">
                    {rating}
                </Text>
                <Text
                    fontSize=".8rem"
                    transform="translateY(-10%)"
                    filter="brightness(0.6)"
                >
                    Average Rating
                </Text>
            </Flex>
        </Flex>
    )
}

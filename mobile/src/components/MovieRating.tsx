import React from 'react'
import { Row, Box, Text, Column } from 'native-base'
import { useMovie } from '../hooks/useMovie'

export function MovieRating() {

    const { movie } = useMovie()
    const voteAverage = movie?.vote_average * 10

    return (
        <Row w="100%" alignItems="center">
            <Box w="100%" h="60px" borderRadius="2px" flex="1" bg="base.700">
                <Box
                    h="100%"
                    w={`${voteAverage}%`}
                    bg="primary"
                    borderRadius="2px"
                    shadow="6"
                />
            </Box>
            <Column pl="14px">
                <Text fontSize="28px">
                    {movie?.vote_average.toFixed(1)}
                </Text>
                <Text fontSize="14px" maxW="70px" top="-8px">Average Rating</Text>
            </Column>
        </Row>
    )
}
import React from 'react'
import { Text, ScrollView } from 'native-base'
import { useMovie } from '../hooks/useMovie'

export function MovieOverview() {

    const { movie } = useMovie()

    return (
        <ScrollView
            bg="base.700"
            flex="1"
            p="16px"
            w="100%"
            borderRadius="4px"
        >
            <Text fontSize="16px">
                {movie?.overview}
            </Text>
        </ScrollView>
    )
}
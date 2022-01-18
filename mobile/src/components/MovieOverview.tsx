import React from 'react'
import { useMovie } from '../hooks/useMovie'

import { Text, ScrollView, Flex } from 'native-base'

export function MovieOverview() {

    const { movie } = useMovie()

    return (
        <ScrollView
            bg="base.700"
            flex="1"
            w="100%"
            borderRadius="4px"
        >
            <Flex p="16px">
                <Text fontSize="16px">
                    {movie?.overview}
                </Text>
            </Flex>
        </ScrollView>
    )
}
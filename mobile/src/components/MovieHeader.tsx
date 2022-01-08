import React from 'react'
import { Row, Text, Divider } from 'native-base'
import { useMovie } from '../hooks/useMovie'

export function MovieHeader() {

    const { movie } = useMovie()
    const releaseYear = movie?.release_date.split('-')[0]

    return (
        <Row alignItems="center" py="20px" space="8px">
            <Text flexShrink="1" fontSize="22px" fontWeight="bold">{movie?.title}</Text>
            <Divider flex="1" thickness="2" />
            <Text
                bg="base.700"
                p="6px"
                px="12px"
                borderRadius="2px"
            >
                {releaseYear} | {movie?.runtime} min
            </Text>
        </Row>
    )
}
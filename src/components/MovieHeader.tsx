import { Flex, Text } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function MovieHeader() {

    const { movie } = useMovie()

    const runtimeInHours = String(movie.runtime / 60).slice(0, 3)
    const releaseYear = movie.release_date.split('-')[0]

    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="1.2rem" mr="1rem">{movie.title}</Text>

            <Flex gridGap=".4rem" bg="dark.200" p=".2rem .6rem" borderRadius=".2rem">
                <Text>{releaseYear}</Text>
                |
                <Text title={`${runtimeInHours} hours`}>{movie.runtime}</Text>
            </Flex>
        </Flex>
    )
}
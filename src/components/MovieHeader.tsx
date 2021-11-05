import { Flex, Text } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function MovieHeader() {

    const { movie } = useMovie()

    return (
        <Flex alignItems="center">
            <Text fontWeight="bold" fontSize="1.2rem" mr="1rem">{movie.Title}</Text>

            <Flex gridGap=".4rem" bg="#3a3838" p=".2rem .6rem" borderRadius=".2rem">
                <Text>{movie.Year}</Text>
                |
                <Text>{movie.Runtime}</Text>
            </Flex>
        </Flex>
    )
}
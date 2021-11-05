import { Flex, Text } from "@chakra-ui/react"
import { useMovie } from "../hooks/useMovie"

export function MovieDescription() {
    const { movie } = useMovie()

    return (
        <Flex maxW="20rem" ml=".8rem">
            <Text>{movie.Plot}</Text>
        </Flex>
    )
}
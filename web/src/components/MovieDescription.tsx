import { Flex, Text } from "@chakra-ui/react"
import { useMovie } from "../hooks/useMovie"

export function MovieDescription() {
    const { movie } = useMovie()
    
    return (
        <Flex
            borderLeft="6px solid"
            borderColor="primary.100"
            pl="1rem"
            maxH="140px"
            overflowY="auto"
        >
            <Text>{movie.overview}</Text>
        </Flex>
    )
}
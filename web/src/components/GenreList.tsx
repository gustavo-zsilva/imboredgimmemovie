import { useMovie } from "../hooks/useMovie"

import { Flex, Text } from "@chakra-ui/react"

export function GenreList() {
    const { movie } = useMovie()
    return (
        <Flex>
            {movie.genres.map(genre => (
                <Flex
                    key={genre.id}
                    borderY="2px solid"
                    borderColor="primary.100"
                    h="30px"
                    py="15px"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    flex="1"
                    transition=".2s"
                    overflow="hidden"
                >
                    <Text fontSize=".95rem">{genre.name}</Text>
                </Flex>
            ))}
        </Flex>
    )
}
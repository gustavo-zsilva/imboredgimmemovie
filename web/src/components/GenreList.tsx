import { GenreTag } from "./GenreTag"
import { useMovie } from "../hooks/useMovie"

import { Flex } from "@chakra-ui/react"

export function GenreList() {
    const { movie } = useMovie()

    return (
        <Flex
            gridGap=".2rem"
        >
            {movie.genres.map(genre => (
                <GenreTag
                    key={genre.id}
                    name={genre.name}
                />

            ))}
        </Flex>
    )
}
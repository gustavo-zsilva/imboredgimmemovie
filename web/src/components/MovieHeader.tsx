import { useMovie } from '../hooks/useMovie'

import { MdExplicit } from 'react-icons/md'
import { Flex, Text, Tooltip } from '@chakra-ui/react'

export function MovieHeader() {

    const { movie } = useMovie()

    const runtimeInHours = String(movie.runtime / 60).slice(0, 3)
    const releaseYear = movie.release_date.split('-')[0]

    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
                <Flex flexDir="column">
                    <Text fontWeight="bold" fontSize="1.2rem" mr=".8rem">
                        {movie.title}
                    </Text>
                    <Text fontSize=".9rem" color="dark.500">
                        {movie.original_title}
                    </Text>
                </Flex>
                {movie.adult &&
                    <Tooltip
                        label="Explicit"
                        placement="top"
                    >
                        <Text>
                            <MdExplicit size={32} />
                        </Text>
                    </Tooltip>
                }
            </Flex>

            <Flex gridGap=".4rem" bg="dark.700" p=".2rem .6rem" borderRadius=".2rem">
                <Text>{releaseYear}</Text>
                |
                <Tooltip label={`${runtimeInHours} hours`}>
                    <Text>{movie.runtime} min</Text>
                </Tooltip>
            </Flex>
        </Flex>
    )
}
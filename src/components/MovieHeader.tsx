import { useEffect, useState } from 'react'
import { useMovie } from '../hooks/useMovie'

import { api } from '../services/api'
import { Flex, Text, Tooltip } from '@chakra-ui/react'

export function MovieHeader() {

    const { movie } = useMovie()
    const [runtime, setRuntime] = useState(0)

    useEffect(() => {
        api.get(`/movie/${movie.id}`)
        .then(response => {
            setRuntime(response.data.runtime)
        }).catch(err => {
            console.error(err)
        })
    }, [movie])

    const runtimeInHours = String(runtime / 60).slice(0, 3)
    const releaseYear = movie.release_date.split('-')[0]

    return (
        <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="bold" fontSize="1.2rem" mr="1rem">{movie.title}</Text>

            <Flex gridGap=".4rem" bg="dark.200" p=".2rem .6rem" borderRadius=".2rem">
                <Text>{releaseYear}</Text>
                |
                <Tooltip
                    label={`${runtimeInHours} hours`}
                    bg="dark.200"
                    color="primary.200"
                >
                    <Text>{runtime} min</Text>
                </Tooltip>
            </Flex>
        </Flex>
    )
}
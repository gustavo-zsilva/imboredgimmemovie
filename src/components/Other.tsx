import { Flex } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'
import { Bubble } from './Bubble'

export function Other() {

    const { movie } = useMovie()

    return (
        <Flex flexDir="column" alignItems="center">
            <Bubble title="Director" description={movie.Director} />
            <Bubble title="Awards" description={movie.Awards} />
            <Bubble title="Genre" description={movie.Genre} />
            <Bubble title="Actors" description={movie.Actors} />
        </Flex>
    )
}
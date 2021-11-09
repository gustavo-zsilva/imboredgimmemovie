import { Button } from '../components/Button'

import { FiShuffle } from 'react-icons/fi'
import { MdMovie } from 'react-icons/md'
import { Flex } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function Controller() {

    const { movie } = useMovie()

    function handleSearchMovie() {
        window.open(`https://google.com/search?q=${movie.Title} watch`)
    }

    return (
        <Flex>
            <Button>
                <FiShuffle color="#000" size={28} />
            </Button>
            <Button bg="primary.100" onClick={handleSearchMovie}>
                <MdMovie size={28} />
            </Button>
        </Flex>
    )
}
import { Button } from '../components/Button'

import { FiShuffle } from 'react-icons/fi'
import { MdMovie } from 'react-icons/md'
import { Flex } from '@chakra-ui/react'
import { useMovie } from '../hooks/useMovie'

export function Controller() {

    const { getNewMovie, handleSearchMovie } = useMovie()

    return (
        <Flex
            gridArea="Controller"
            mt="4rem"
            gridGap="1rem"
            justifyContent="center"
        >
            <Button onClick={getNewMovie}>
                <FiShuffle color="#000" size={28} />
            </Button>
            <Button bg="primary.100" onClick={handleSearchMovie}>
                <MdMovie size={28} />
            </Button>
        </Flex>
    )
}
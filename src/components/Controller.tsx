import { useEffect } from 'react'
import { Button } from '../components/Button'
import { useMovie } from '../hooks/useMovie'

import { MdMovie } from 'react-icons/md'
import { FiShuffle } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'

export function Controller() {

    const { handleGetRandomMovie, handleSearchMovie } = useMovie()

    useEffect(() => {
        window.document.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleGetRandomMovie()
            }
        }
            
    }, [handleGetRandomMovie])

    return (
        <Flex
            gridArea="Controller"
            mt="4rem"
            gridGap="1rem"
            justifyContent="center"
        >
            <Button onClick={handleGetRandomMovie}>
                <FiShuffle color="#000" size={28} />
            </Button>
            <Button bg="primary.100" onClick={handleSearchMovie}>
                <MdMovie size={28} />
            </Button>
            <Button bg="primary.400">
                <AiOutlineHeart size={32} />
            </Button>
        </Flex>
    )
}
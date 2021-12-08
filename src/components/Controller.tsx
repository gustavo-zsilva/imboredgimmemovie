import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { useMovie } from '../hooks/useMovie'

import { MdMovie } from 'react-icons/md'
import { FiShuffle, FiRepeat } from 'react-icons/fi'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { Flex } from '@chakra-ui/react'

export function Controller() {

    const {
        handleGetRandomMovie,
        handleSearchMovie,
        handleAddToLikedMovies,
        handleLazyMovie,
        isCurrentMovieLiked,
        isLazyMovie,
    } = useMovie()
    // const [lazyMovieCounter, setLazyMovieCounter] = useState(1)
    // const lazyMoviePercentage = (lazyMovieCounter / 8) * 100

    // useEffect(() => {
    //     if (!isLazyMovie || lazyMovieCounter >= 8) {
    //         setLazyMovieCounter(0)
    //         return
    //     }
        
    //     const timeoutId = setTimeout(() => {
    //         setLazyMovieCounter(prevState => prevState + 1)
    //     }, 1000)

    //     return () => clearTimeout(timeoutId)
        
    // }, [isLazyMovie, lazyMovieCounter, lazyMoviePercentage])

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
            <Button bg="primary.400" onClick={handleAddToLikedMovies}>
                {isCurrentMovieLiked ? (
                    <AiFillHeart size={32} />
                ) : (
                    <AiOutlineHeart size={32} />
                )}
            </Button>
            <Button
                onClick={handleLazyMovie}
                bg={isLazyMovie ? "green.400" : "primary.200"}
            >
                <FiRepeat size={28} color={isLazyMovie ? "#F7F4F3" : "#000"} />
            </Button>
        </Flex>
    )
}
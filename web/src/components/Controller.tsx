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

    return (
        <Flex
            gridArea="Controller"
            gridGap="1rem"
            justifyContent="center"
            alignItems="center"
        >
            <Button
                aria-label="Get Movie"
                onClick={handleGetRandomMovie}
            >
                <FiShuffle color="#000" size={28} />
            </Button>
            <Button
                aria-label="Search Movie"
                bg="primary.100"
                onClick={handleSearchMovie}
            >
                <MdMovie size={28} />
            </Button>
            <Button
                aria-label="Like Movie"
                bg="primary.400"
                onClick={handleAddToLikedMovies}
            >
                {isCurrentMovieLiked ? (
                    <AiFillHeart size={32} />
                ) : (
                    <AiOutlineHeart size={32} />
                )}
            </Button>
            <Button
                aria-label="Lazy Movie Mode"
                onClick={handleLazyMovie}
                bg={isLazyMovie ? "green.400" : "primary.200"}
            >
                <FiRepeat size={28} color={isLazyMovie ? "#F7F4F3" : "#000"} />
            </Button>
        </Flex>
    )
}
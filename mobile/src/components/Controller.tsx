import React from 'react'

import { Button } from './Button'

import FiIcon from 'react-native-vector-icons/Feather'
import AiIcon from 'react-native-vector-icons/AntDesign'
import { Row } from 'native-base'
import { useMovie } from '../hooks/useMovie'

export function Controller() {

    const {
        handleGetRandomMovie,
        handleAddToLikedMovies,
        handleLazyMovie,
        isLazyMovieOn,
        likedMovies,
        movie,
    } = useMovie()

    return (
        <Row
            justifyContent="center"
            alignItems="center"
            space="10px"
            mt="20px"
            bg="base.700"
            w="100%"
            p="10px"
            borderRadius="4px"
        >
            <Button onPress={handleLazyMovie} bg={isLazyMovieOn ? "green.400" : "white.100"}>
                <FiIcon name="repeat" size={25} color={isLazyMovieOn ? "#F7F4F3" : "#3A3838"} />
            </Button>
            <Button w="65px" h="65px" onPress={handleGetRandomMovie}>
                <FiIcon name="shuffle" size={32} />
            </Button>
            <Button bg="secondary.100" _pressed={{ bg: 'secondary.200' }} onPress={handleAddToLikedMovies}>
                {likedMovies.some(({ id }) => id === movie?.id) ? (
                    <AiIcon name="heart" size={25} color="#F7F4F3" />
                ) : (
                    <AiIcon name="hearto" size={25} color="#F7F4F3" />
                )}
            </Button>
        </Row>
    )
}
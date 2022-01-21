import React, { useEffect, useState } from 'react'
import { useMovie } from '../hooks/useMovie'

import { Skeleton } from 'moti/skeleton'
import { Flex, Image, Pressable } from "native-base"

export function MoviePoster() {

    const { movie, isMovieLoading } = useMovie()
    const [isShown, setIsShown] = useState(false)
    const imageUri = `https://image.tmdb.org/t/p/original${movie?.poster_path}`

    function handleShowPoster() {
        setIsShown(true)
    }

    useEffect(() => {
        setIsShown(false)
    }, [movie])

    return (
        <Flex
            borderRadius="2px"
            width="100%"
            py="8px"
            shadow="1"
            alignItems="center"
            position="relative"
        >
            {movie?.poster_path && (
                <Image
                    key={movie?.poster_path}
                    flex="1"
                    position="absolute"
                    resizeMode="cover"
                    top="0"
                    bottom="0"
                    left="0"
                    right="0"
                    blurRadius={8}
                    borderRadius="2px"
                    source={{ uri: imageUri }}
                    alt="Poster Background"
                />
            )}
            {!isMovieLoading && movie ? (
                <Pressable onPress={handleShowPoster}>
                    <Image
                        key={movie?.id}
                        w="200px"
                        h="300px"
                        margin="auto"
                        alignSelf="center"
                        blurRadius={movie?.adult && !isShown ? 12 : 0}
                        source={{ uri: imageUri }}
                        alt="Poster"
                    />
                </Pressable>
            ) : (
                <Skeleton
                    show={!movie}
                    radius="square"
                    width={200}
                    height={300}
                />
            )}
        </Flex>
    )
}
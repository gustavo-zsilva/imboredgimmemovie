import React from 'react'
import { useMovie } from '../hooks/useMovie'

import { Skeleton } from 'moti/skeleton'
import { Flex, Image, Factory } from "native-base"

export function MoviePoster() {

    const { movie } = useMovie()
    const imageUri = `https://image.tmdb.org/t/p/original${movie?.poster_path || '#'}`
    const FactorySkeleton = Factory(Skeleton)

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
            {movie ? (
                <Image
                    key={movie?.id}
                    w="200px"
                    h="300px"
                    margin="auto"
                    alignSelf="center"
                    blurRadius={movie.adult ? 8 : 0}
                    source={{ uri: imageUri }}
                    alt="Poster"
                />
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
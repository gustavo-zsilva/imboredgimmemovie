import React from 'react'
import { Flex, Text, Image } from "native-base"
import { ImageBackground } from 'react-native'
import { useMovie } from '../hooks/useMovie'

export function MoviePoster() {

    const { movie } = useMovie()
    const imageUri = `https://image.tmdb.org/t/p/original${movie?.poster_path}`

    return (
        <Flex
            w="100%"
            py="8px"
            shadow="1"
            borderRadius="2px"
            position="relative"
        >
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
            {movie ? (    
                <Image
                    key={movie.id}
                    w="200px"
                    h="300px"
                    alignSelf="center"
                    source={{ uri: imageUri }}
                    alt="Poster"
                />
            ) : (
                <Flex
                    w="200px"
                    h="300px"
                    bg="base.700"
                    alignSelf="center"
                />
            )}
        </Flex>
    )
}
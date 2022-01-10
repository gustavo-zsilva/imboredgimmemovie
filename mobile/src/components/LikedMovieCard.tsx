import React from 'react'
import { useMovie } from '../hooks/useMovie'

import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Text, Image, Pressable } from "native-base"

type Genres = {
    id: string,
    name: string,
}[]

type MovieProps = {
    title: string,
    vote_average: number,
    id: number,
    poster_path: string | null,
    overview: string,
    genres: Genres,
    release_date: string,
    runtime: number,
}

type LikedMovieCardProps = {
    movie: MovieProps,
}

export function LikedMovieCard({ movie }: LikedMovieCardProps) {

    const { handleSetMovie } = useMovie()
    const { navigate } = useNavigation()
    const imageUri = `https://image.tmdb.org/t/p/original${movie.poster_path}`

    function handleMoviePress() {
        handleSetMovie(movie)
        navigate('ForYou')
    }
    
    return (
        <Pressable
            position="relative"
            w={wp('90%')}
            h="80px"
            bg="base.800"
            mb="8px"
            justifyContent="center"
            alignItems="center"
            borderRadius="2px"
            onPress={handleMoviePress}
        >
            <Image
                source={{ uri: imageUri }}
                width="100%"
                height="auto"
                alt="Image"
                flex="1"
                p="4px"
                alignSelf="center"
                blurRadius={8}
                borderRadius="2px"
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
            />
            <Text bg="rgba(58, 56, 56, 0.6)" p="4px" borderRadius="2px">{movie.title}</Text>
        </Pressable>
    )
}
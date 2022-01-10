import React from 'react'
import { LikedMovieCard } from '../components/LikedMovieCard'
import { Header } from '../components/Header'
import { useMovie } from '../hooks/useMovie'

import { Container, FlatList } from "native-base"

export function Liked({ navigation }: any) {

    const { likedMovies } = useMovie()

    return (
        <Container>
            <Header>
                liked
            </Header>
            <FlatList
                data={likedMovies}
                renderItem={({ item }) => (
                    <LikedMovieCard movie={item} />
                )}
            />
        </Container>
    )
}
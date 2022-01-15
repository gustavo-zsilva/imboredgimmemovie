import React from 'react'
import { LikedMovieCard } from '../components/LikedMovieCard'
import { LikedMovieEmpty } from '../components/LikedMovieEmpty'
import { Header } from '../components/Header'
import { useMovie } from '../hooks/useMovie'

import { Container, FlatList } from "native-base"

export function Liked() {

    const { likedMovies, handleGetLikedMovies, isRefreshingLikedMovies } = useMovie()

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
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={LikedMovieEmpty}
                onRefresh={handleGetLikedMovies}
                refreshing={isRefreshingLikedMovies}
                w="100%"
                contentContainerStyle={{ minHeight: '100%' }}
            />
        </Container>
    )
}
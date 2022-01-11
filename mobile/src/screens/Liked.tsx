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
                data={[]}
                renderItem={({ item }) => (
                    <LikedMovieCard movie={item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={LikedMovieEmpty}
                onRefresh={handleGetLikedMovies}
                refreshing={isRefreshingLikedMovies}

                flex="1"
                w="100%"
                contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
            />
        </Container>
    )
}
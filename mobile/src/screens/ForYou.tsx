import React from 'react'

import { Header } from "../components/Header";
import { MoviePoster } from "../components/MoviePoster";
import { MovieHeader } from "../components/MovieHeader";
import { WatchProviders } from "../components/WatchProviders";
import { MovieOverview } from "../components/MovieOverview";
import { Controller } from "../components/Controller";

import { Container } from 'native-base'

export function ForYou() {
    return (
        <Container>
            <Header>
                for you
            </Header>
            <MoviePoster />
            <MovieHeader />
            <WatchProviders />
            <MovieOverview />
            <Controller />
        </Container>
    )
}
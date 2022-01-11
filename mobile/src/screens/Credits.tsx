import React, { useEffect, useState } from 'react'

import { Container, Column, Flex } from 'native-base'
import { Bubble } from '../components/Bubble'
import { Header } from '../components/Header'
import { MovieRating } from '../components/MovieRating'
import { useMovie } from '../hooks/useMovie'
import { api } from '../services/api'

type Cast = {
    name: string,
    popularity: number,
}

type Crew = {
    name: string,
    department: string,
}

type Response = {
    cast: Cast[],
    crew: Crew[],
}

export function Credits() {

    const { movie } = useMovie()
    const [cast, setCast] = useState('')
    const [producers, setProducers] = useState('')
    const [directors, setDirectors] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {
        if (!movie) return

        api.get<Response>(`/movie/${movie?.id}/credits`)
        .then(response => {
            const cast = response.data.cast
            const crew = response.data.crew

            const actorPopularities = cast.map(actor => actor.popularity)
            const mathMax = []

            for (let i = 0; i <= 2; i++) {
                const max = Math.max(...actorPopularities)
                mathMax.push(max)
                actorPopularities.splice(actorPopularities.indexOf(max), 1)
            }
            
            const popularCast = cast.filter(actor => mathMax.includes(actor.popularity) && actor)
                .slice(0, 3)
                .map(({ name }) => name)
                .join(', ')
            const directors = crew.filter(({ department, name }) => department === 'Directing' && name)
                .slice(0, 3)
                .map(({ name }) => name)
                .join(', ')
            const producers = crew.filter(({ department, name }) => department === 'Production' && name)
                .slice(0, 3)
                .map(({ name }) => name)
                .join(', ')
            const genres = movie.genres.map(({ name }) => name)
                .join(', ')
            
            setCast(popularCast)
            setDirectors(directors)
            setProducers(producers)
            setGenres(genres)
        })
        .catch(err => {
            console.error(err)
        })
    }, [movie])

    return (
        <Container>
            <Header>
                credits
            </Header>

            <Flex w="100%" flex="1" justifyContent="space-between">
                <Column
                    w="100%"
                    space="20px"
                >
                    <Bubble title="Cast" content={cast} />
                    <Bubble title="Directors" content={directors} />
                    <Bubble title="Producers" content={producers} />
                    <Bubble title="Genres" content={genres} />
                </Column>

                <MovieRating />
            </Flex>
        </Container>
    )
}
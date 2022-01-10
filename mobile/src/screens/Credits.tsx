import React, { useEffect, useState } from 'react'

import { Container, VStack } from 'native-base'
import { Bubble } from '../components/Bubble'
import { Header } from '../components/Header'
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
    const [producers, setProducers] = useState('')
    const [directors, setDirectors] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {
        api.get<Response>(`/movie/${movie?.id}/credits`)
        .then(response => {
            const cast = response.data.cast
            const crew = response.data.crew

            const parsedCast = cast.map(actor => ({
                name: actor.name,
                popularity: actor.popularity,
            })).filter(Boolean)
            
            const directors = crew.filter(({ department }) => department === 'Directing')
                .slice(0, 3)
                .map(({ name }) => name)
                .join(', ')
            const producers = crew.filter(({ department }) => department === 'Production')
                .slice(0, 3)
                .map(({ name }) => name)
                .join(', ')
            const genres = movie.genres.map(({ name }) => name)
                .join(', ')
            
            setDirectors(directors)
            setProducers(producers)
            setGenres(genres)
        })
        .catch(err => {
            console.error(err)
        })
    }, [movie])

    return (
        <Container
            w="100%"
            flex="1"
        >
            <Header>
                credits
            </Header>

            <VStack
                w="100%"
                space="20px"
            >
                <Bubble title="Cast" content="Salve salve galerinha" />
                <Bubble title="Directors" content={directors} />
                <Bubble title="Producers" content={producers} />
                <Bubble title="Genres" content={genres} />
            </VStack>
        </Container>
    )
}
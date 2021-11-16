import { useEffect, useState } from 'react'

import { useMovie } from '../hooks/useMovie'
import { Bubble } from './Bubble'

import { api } from '../services/api'
import { Flex } from '@chakra-ui/react'
import { MovieRating } from './MovieRating'

type Actors = {
    name: string,
}

type Crewmate = {
    department: string,
    name: string,
}

type CreditsProps = {
    cast: Actors[],
    crew: Crewmate[],
}

type Genre = {
    id: number,
    name: string,
}

type GenreListProps = {
    genres: Genre[],
}

export function Other() {

    const { movie } = useMovie()

    const [directors, setDirectors] = useState('')
    const [cast, setCast] = useState('')
    const [producers, setProducers] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {
        api.get<GenreListProps>('/genre/movie/list', {
            params: {
                api_key: process.env.API_KEY,
            }
        }).then(response => {
            const { genres } = response.data
            const parsedGenres = genres.map(genre => movie.genre_ids.includes(genre.id) && genre.name)
                .filter(Boolean)
                .join(', ')

            setGenres(parsedGenres)
            
        }).catch(err => {
            console.error(err)
        })
    }, [movie])

    useEffect(() => {
        api.get<CreditsProps>(`/movie/${movie.id}/credits`, {
            params: {
                api_key: process.env.API_KEY,
            }
        }).then(response => {

            const { cast, crew } = response.data

            const parsedCast = cast.map(({ name }) => name)
                .slice(0, 3)
                .join(', ')
            
            const parsedDirectors = crew.map(({ department, name }) => department === 'Directing' && name)
                .filter(Boolean)
                .slice(0, 3)
                .join(', ')

            const parsedProducers = crew.map(({ department, name }) => department === 'Production' && name)
                .filter(Boolean)
                .slice(0, 3)
                .join(', ')

            setCast(parsedCast)
            setDirectors(parsedDirectors)
            setProducers(parsedProducers)
            
        }).catch(err => {
            console.error(err)
        })
    }, [movie])

    return (
        <Flex flexDir="column" alignItems="center" gridArea="Other">
            <Bubble title="Cast" description={cast} />
            <Bubble title="Directors" description={directors} />
            <Bubble title="Producers" description={producers} />
            <Bubble title="Genres" description={genres} />

            <MovieRating />
        </Flex>
    )
}

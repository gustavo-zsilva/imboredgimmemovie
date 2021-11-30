import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { MovieProvider } from '../contexts/MovieContext'
import { MoviePoster } from '../components/MoviePoster'
import { MovieHeader } from '../components/MovieHeader'
import { MovieDescription } from '../components/MovieDescription'
import { Other } from '../components/Tabs'
import { Header } from '../components/Header'
import { Controller } from '../components/Controller'

import { Flex } from '@chakra-ui/react'
import { api } from '../services/api'
import { MovieRecommendations } from '../components/MovieRecommendations'
import { useMovie } from '../hooks/useMovie'
import { MovieWatchProviders } from '../components/MovieWatchProviders'
import { LikedMovieList } from '../components/LikedMovieList'

type MovieProps = {
    title: string,
    id: number,
    original_title: string,
    overview: string,
    adult: boolean,
    release_date: string,
    runtime: number,
    genre_ids: number[],
    vote_average: number,
    popularity: number,
    poster_path: string,
}

type HomeProps = {
    movie: MovieProps,
}


export default function Home({ movie }: HomeProps) {
    return (
        <MovieProvider defaultMovie={movie}>
            <Head>
                <title>imboredgimmemovie | Movie Randomizer</title>
            </Head>

            <Flex
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gridTemplateRows="6rem auto auto auto"
                gridTemplateAreas={{sm: `
                    'Header Header'
                    'Movie Movie'
                    'Controller Controller'
                    'Other Other'
                    'Recommendations Recommendations'
                    `, md: `
                    'Header Header'
                    'Movie Other'
                    'Controller Controller'
                    'Recommendations Recommendations'
                `}}
                mx={[ '2rem', '0rem' ]}
            >
                <Header />

                <Flex flexDir="column" gridGap="1rem" gridArea="Movie">
                    <MoviePoster />
                    <MovieHeader />
                    <MovieWatchProviders />
                    <MovieDescription />
                </Flex>

                <Other />

                <Controller />

                <MovieRecommendations />
            </Flex>

        </MovieProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const page = Math.floor(Math.random() * 500)
    const movieIndex = Math.floor(Math.random() * 20)

    const response = await api.get('/movie/popular', {
        params: {
            page,
        }
    })

    const movie = response.data.results[movieIndex]

    console.log(movie)

    return {
        props: {
            movie,
        }
    }
}
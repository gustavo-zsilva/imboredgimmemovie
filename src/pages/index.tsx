import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { MovieProvider } from '../contexts/MovieContext'
import { MoviePoster } from '../components/MoviePoster'
import { MovieHeader } from '../components/MovieHeader'
import { MovieDescription } from '../components/MovieDescription'
import { Other } from '../components/Other'
import { Header } from '../components/Header'
import { Controller } from '../components/Controller'

import { Flex } from '@chakra-ui/react'
import { api } from '../services/api'

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
                gridTemplateRows="6rem auto auto"
                gridTemplateAreas={`'Header Header' 'Movie Other' 'Controller Controller'`}
            >
                <Header />

                <Flex flexDir="column" gridGap="1rem" gridArea="Movie">
                    <MoviePoster />
                    <MovieHeader />
                    <MovieDescription />
                </Flex>

                <Other />

                <Controller />
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
            api_key: process.env.API_KEY,
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
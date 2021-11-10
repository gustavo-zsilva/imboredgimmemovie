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
import axios from 'axios'

type HomeProps = {
    movie: {
        Title: string,
        Year: string,
        Runtime: string,
        Genre: string,
        Director: string,
        Actors: string,
        Plot: string,
        Awards: string,
        Poster: string,
    }
}

type TMDBMovieProps = {
    title: string,
}

type TMDBPageProps = {
    results: TMDBMovieProps[]
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

    const randomPage = await axios.get<TMDBPageProps>(`https://api.themoviedb.org/3/movie/popular`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            page,
        }
    })

    const randomMovie = randomPage.data.results[movieIndex].title

    const response = await api.get('/', {
        params: {
            t: randomMovie,
        }
    })
    const movie = response.data

    return {
        props: {
            movie,
        }
    }
}
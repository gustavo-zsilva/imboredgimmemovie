import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { MovieProvider } from '../contexts/MovieContext'
import { MoviePoster } from '../components/MoviePoster'
import { MovieHeader } from '../components/MovieHeader'
import { MovieDescription } from '../components/MovieDescription'
import { Other } from '../components/Other'
import { Header } from '../components/Header'
import { Controller } from '../components/Controller'

import { Flex, Divider } from '@chakra-ui/react'
import { api } from '../services/api'

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

export default function Home({ movie }: HomeProps) {
    console.log(movie)

    return (
        <MovieProvider defaultMovie={movie}>
            <Head>
                <title>imboredgimmemovie | Movie Randomizer</title>
            </Head>

            <Flex
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gridTemplateRows="6rem auto"
                gridTemplateAreas={`'Header Header' 'Movie Other'`}
            >
                <Header />

                <Flex flexDir="column" gridGap="1rem" gridArea="Movie">
                    <MoviePoster />
                    <MovieHeader />
                    <MovieDescription />
                </Flex>

                <Other />
            </Flex>

            {/* <Divider /> */}

            <Controller />

        </MovieProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get('/', {
        params: {
            apikey: process.env.API_KEY,
            t: 'ninjago'
        }
    })
    const movie = response.data

    return {
        props: {
            movie,
        }
    }
}
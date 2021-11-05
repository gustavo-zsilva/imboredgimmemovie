import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { MovieProvider } from '../contexts/MovieContext'
import { MoviePoster } from '../components/MoviePoster'
import { MovieInfo } from '../components/MovieInfo'

import { Flex } from '@chakra-ui/react'
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
            <Flex justifyContent="center">
                <Head>
                    <title>imboredgimmemovie | Movie Randomizer</title>
                </Head>

                <Flex>
                    
                </Flex>
                <MoviePoster />
                <MovieInfo />
            </Flex>
        </MovieProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await api.get('/', {
        params: {
            apikey: process.env.API_KEY,
            i: 'tt3896198'
        }
    })
    const movie = response.data

    return {
        props: {
            movie,
        }
    }
}
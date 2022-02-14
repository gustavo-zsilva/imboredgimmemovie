import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { MovieProvider } from '../contexts/MovieContext'
import { MoviePoster } from '../components/MoviePoster'
import { MovieHeader } from '../components/MovieHeader'
import { MovieDescription } from '../components/MovieDescription'
import { Tabs } from '../components/Tabs'
import { Header } from '../components/Header'
import { Controller } from '../components/Controller'
import { MovieRating } from '../components/MovieRating'
import { MovieRecommendations } from '../components/MovieRecommendations'
import { MovieWatchProviders } from '../components/MovieWatchProviders'
import { GenreList } from '../components/GenreList'
import { Footer } from '../components/Footer'

import { parseCookies, setCookie } from 'nookies'
import axios from 'axios'
import { api } from '../services/api'
import { graphQLClient } from '../pages/api/graphql'
import { Flex } from '@chakra-ui/react'

type Genre = {
    name: string,
    id: number,
}

type MovieProps = {
    title: string,
    id: number,
    original_title: string,
    overview: string,
    adult: boolean,
    release_date: string,
    genres: Genre[],
    vote_average: number,
    popularity: number,
    poster_path: string,
    runtime: number | null,
}

type Location = {
    country: string,
    countryCode: string,
}

type HomeProps = {
    movie: MovieProps,
    location: Location,
}

export default function Home({ movie, location }: HomeProps) {
    return (
        <MovieProvider
            defaultMovie={movie}
            location={location}
        >
            <Head>
                <title>imboredgimmemovie | Movie Randomizer</title>
            </Head>

            <Flex
                display="grid"
                gridTemplateColumns="1fr 1fr"
                gridTemplateRows="10vh 75vh 15vh auto auto"
                gridTemplateAreas={{sm: `
                    'Header Header'
                    'Movie Movie'
                    'Controller Controller'
                    'Other Other'
                    'Recommendations Recommendations'
                    'Footer Footer'
                    `, md: `
                    'Header Header'
                    'Movie Other'
                    'Controller Controller'
                    'Recommendations Recommendations'
                    'Footer Footer'
                `}}
                mx={[ '2rem', '0rem' ]}
            >
                <Header />

                <Flex flexDir="column" gridGap="1rem" gridArea="Movie">
                    <GenreList />
                    <MoviePoster />
                    <MovieHeader />
                    <MovieWatchProviders />
                    <MovieDescription />
                </Flex>

                <Flex
                    gridArea="Other"
                    flexDir="column"
                    justifyContent="space-between"
                >
                    <Tabs />
                    <MovieRating />
                </Flex>

                <Controller />

                <MovieRecommendations />

                <Footer />
            </Flex>
        </MovieProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    
    const {
        ['@ibgm_user_location']: rawUserLocation,
    } = parseCookies(ctx)
    const cookieLocation = rawUserLocation ? JSON.parse(rawUserLocation) : null

    const { locale } = ctx

    const { data } = await graphQLClient.executeOperation({
        query: `
            {
                randomMovie(locale: "${locale}") {
                    title
                    id
                    original_title
                    overview
                    adult
                    release_date
                    genres {
                        name
                        id
                    }
                    vote_average
                    popularity
                    poster_path
                    runtime
                }
            }
        `
    })

    const movie = data.randomMovie
    
    const rawLocation = await axios.get('http://ip-api.com/json', {
        params: {
            fields: "country,countryCode",
        }
    })
    const location = rawLocation.data || { country: 'Brazil', countryCode: 'BR' }
    location.locale = locale
    
    if (cookieLocation?.country !== location.country || !cookieLocation) {
        setCookie(ctx, '@ibgm_user_location', JSON.stringify(location))
    }
    
    return {
        props: {
            movie,
            location,
        }
    }
}
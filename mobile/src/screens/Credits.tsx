import React, { useEffect, useState } from 'react'

import { Bubble } from '../components/Bubble'
import { Header } from '../components/Header'
import { MovieRating } from '../components/MovieRating'
import { useMovie } from '../hooks/useMovie'
import { api } from '../services/api'

import { Skeleton } from 'moti/skeleton'
import { FactoryMotiView } from '../components/FactoryMotiView'
import { useDynamicAnimation } from 'moti'
import {
    Container,
    Column,
    Flex,
    Stagger,
    Text,
    Row,
} from 'native-base'

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

    const topAnimation = useDynamicAnimation(() => ({
        translateY: -35,
        opacity: 0,
    }))

    const containerAnimation = useDynamicAnimation(() => ({
        translateY: 160,
    }))

    const staggerAnimation = useDynamicAnimation(() => ({
        opacity: 0,
        translateY: -35,
    }))

    return (
        <Column flex="1" bg="pink.400">
            <FactoryMotiView
                state={topAnimation}
                onLayout={() => {
                    topAnimation.animateTo({
                        translateY: 0,
                        opacity: 1
                    })
                }}
                transition={{
                    type: 'timing',
                    duration: 850,
                }}
            >
                <Column p="20px">
                    <Header>
                        credits
                    </Header>
                    <Flex>
                        <Row alignItems="center" justifyContent="space-between" space="8px">
                            <Text fontSize="26px" fontWeight="bold" flexShrink="1">
                                {movie?.title}
                            </Text>
                            {
                                movie?.adult &&
                                <FactoryMotiView
                                    size={38}
                                    justifyContent="center"
                                    borderRadius="4px"
                                    bg="base.800"
                                    shadow={2}
                                    from={{
                                        opacity: 0,
                                        scale: 0.9,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                    }}
                                    transition={{
                                        type: 'spring',
                                        duration: 350
                                    }}
                                >
                                    <Text textAlign="center">+18</Text>
                                </FactoryMotiView>
                            }
                        </Row>
                        <Text>{genres}</Text>
                    </Flex>
                </Column>
            </FactoryMotiView>

            <FactoryMotiView
                flex="1"
                state={containerAnimation}
                onLayout={() => {
                    containerAnimation.animateTo({ translateY: 0 })
                }}
                transition={{
                    type: 'timing',
                    duration: 850,
                }}
            >
                <Container
                    borderTopRadius="40px"
                    justifyContent="space-between"
                    shadow={6}
                >
                    <Column
                        space="20px"
                        pt="30px"
                        w="100%"
                    >
                        {/* <Stagger
                            visible={isStaggerMounted}
                            initial={{
                                opacity: 0,
                                translateY: -35,
                            }}
                            animate={{
                                opacity: 1,
                                translateY: 0,
                                transition: {
                                    stagger: {
                                        offset: 30,
                                    },
                                    delay: 150,
                                }
                            }}
                        > */}
                        <FactoryMotiView
                            state={staggerAnimation}
                            transition={{
                                delay: 350,
                            }}
                            onLayout={() => {
                                staggerAnimation.animateTo({ opacity: 1, translateY: 0 })
                            }}
                        >
                            <Bubble title="Cast" content={cast} />
                            <Bubble title="Directors" content={directors} />
                            <Bubble title="Producers" content={producers} />
                        </FactoryMotiView>
                        {/* </Stagger> */}
                    </Column>

                    <MovieRating />
                </Container>
            </FactoryMotiView>
        </Column>
    )
}
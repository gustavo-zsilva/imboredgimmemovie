import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'
import { Skeleton } from './Skeleton'

import { graphQLClient } from '../pages/api/graphql'
// import { motion } from 'framer-motion'
import { Flex, Text, Spinner, Tooltip, Link, chakra } from '@chakra-ui/react'

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
    link: string,
}

export function MovieWatchProviders() {

    const { movie, userLocation, handleGetMovieRecommendations } = useMovie()
    const [providersList, setProvidersList] = useState<Provider[] | null>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // const FactoryMotion = chakra(motion.div)
    // const FactoryMotionLink = chakra(motion.a)

    const list = {
        hidden: {
            opacity: 0,
            transition: {
                when: "afterChildren",
            }
        },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        }
    }

    const item = {
        hidden: {
            opacity: 0,
            y: -10,
        },
        visible: {
            opacity: 1,
            y: 0,
        }
    }

    useEffect(() => {
        setIsImageLoaded(false)
        setIsLoading(true)
        setProvidersList(null)

        const parsedTitle = movie.title
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .replaceAll(' - ', ' ')
            .replaceAll(': ', ' ')
            .replaceAll('&', 'e')
            .split(' ')
            .join('-')
            .toLowerCase()

        graphQLClient.executeOperation({
            query: `
                {
                    watchProviders(
                        movieId: "${movie.id}"
                        countryCode: "${userLocation.countryCode}"
                        movieSlug: "${parsedTitle}"
                    ) {
                        provider_id
                        provider_name
                        logo_path
                        link
                    }
                }
            `
        }).then(({ data }) => {
            setProvidersList(data.watchProviders)
            setIsLoading(false)
        }).catch(err => {
            console.error(err)
            setProvidersList(null)
            setIsLoading(false)
        })
        
    }, [movie, userLocation])

    return (
        <Flex
            display="flex"
            gridGap="1rem"
            initial="hidden"
            animate="visible"
            variants={list}
        >
            {isLoading && <Spinner />}

            {!providersList && !isLoading ? (
                <Text fontSize=".9rem" alignSelf="center">
                    There are no providers for this movie in {userLocation.country}.
                </Text>
            ) : (
                providersList?.map(provider => {
                    return (
                        <Link
                            key={provider.provider_id}
                            href={provider.link}
                            onClick={handleGetMovieRecommendations}
                            target="_blank"
                            rel="noopener noreferrer"
                            // variants={item}
                        >
                            <Tooltip label={provider.provider_name}>
                                <Flex
                                    borderRadius=".2rem"
                                    overflow="hidden"
                                    cursor="pointer"
                                    lineHeight="0"
                                    opacity={!provider.link ? .4 : 1}
                                >
                                    <Skeleton isLoaded={isImageLoaded}>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                            width={50}
                                            height={50}
                                            alt={provider.provider_name}
                                            onLoadingComplete={() => setIsImageLoaded(true)}
                                        />
                                    </Skeleton>
                                </Flex>
                            </Tooltip>
                        </Link>
                    )
                })
            )}
        </Flex>
    )
}
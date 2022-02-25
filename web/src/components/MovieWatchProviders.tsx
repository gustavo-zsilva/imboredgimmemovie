import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'
import { Skeleton } from './Skeleton'

import { useQuery } from 'react-query'
import { graphQLClient } from '../pages/api/graphql'
import { Flex, Text, Spinner, Tooltip, Link, chakra } from '@chakra-ui/react'

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
    link: string,
}

export function MovieWatchProviders() {

    const { movie, userLocation, handleGetMovieRecommendations } = useMovie()
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    const { data: watchProviders, isLoading } = useQuery<Provider[], Error>(
        ['watchProviders', movie, userLocation],
        async () => {
            const parsedTitle = movie.title
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replaceAll(' - ', ' ')
                .replaceAll(': ', ' ')
                .replaceAll('&', 'e')
                .split(' ')
                .join('-')
                .toLowerCase()

            const { data } = await graphQLClient.executeOperation({
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
            })
            
            return data.watchProviders
        }
    )
    
    return (
        <Flex
            display="flex"
            gridGap="1rem"
            initial="hidden"
            animate="visible"
        >
            {isLoading && <Spinner />}

            {!watchProviders && !isLoading ? (
                <Text fontSize=".9rem" alignSelf="center">
                    There are no providers for this movie in {userLocation.country}.
                </Text>
            ) : (
                watchProviders?.map(provider => {
                    return (
                        <Link
                            key={provider.provider_id}
                            href={provider.link}
                            onClick={handleGetMovieRecommendations}
                            target="_blank"
                            rel="noopener noreferrer"
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
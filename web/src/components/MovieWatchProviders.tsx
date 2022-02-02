import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'
import { Skeleton } from './Skeleton'

import { graphQLClient } from '../pages/api/graphql'
import { Flex, Text, Tooltip, Link, Spinner } from '@chakra-ui/react'

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
    link: string,
}

export function MovieWatchProviders() {

    const { movie, userLocation } = useMovie()
    const [providersList, setProvidersList] = useState<Provider[] | null>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
        <Flex gridGap="1rem">
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
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Tooltip
                                label={provider.provider_name}
                                bg="dark.200"
                                color="primary.200"
                            >
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
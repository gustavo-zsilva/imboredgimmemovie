import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'
import { Skeleton } from './Skeleton'

import axios from 'axios'
import { api } from '../services/api'
import { Flex, Text, Tooltip, Link } from '@chakra-ui/react'

type UserLocation = {
    country: string,
    countryCode: string,
}

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
}

type DeepLinks = {
    link: string,
    name: string,
}

type DeepLinksResponse = {
    deepLinks: DeepLinks[],
    status: string,
}

type Translation = {
    iso_3166_1: string,
    data: TranslationData,
}

type TranslationData = {
    title: string,
    overview: string,
}

type TranslationsResponse = {
    translations: Translation[],
    name: string,
}

export function MovieWatchProviders() {

    const { movie, userLocation } = useMovie()
    const [providersList, setProvidersList] = useState<Provider[] | null>(null)
    const [isImageLoaded, setIsImageLoaded] = useState(false)
    const [deepLinks, setDeepLinks] = useState<DeepLinks[] | null>([])
    

    async function getDeepLinks() {
        try {
            setDeepLinks([])

            const parsedTitle = movie.title
                .normalize('NFD')
                .replace(/\p{Diacritic}/gu, '')
                .replaceAll(' - ', ' ')
                .replaceAll(': ', ' ')
                .replaceAll('&', 'and')
                .split(' ')
                .join('-')
                .toLowerCase()
                
            const response = await axios.get<DeepLinksResponse>('http://localhost:3001', {
                params: {
                    countryCode: userLocation.countryCode.toLowerCase(),
                    movie: parsedTitle,
                }
            })

            setDeepLinks(response.data.deepLinks)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setIsImageLoaded(false)

        api.get(`/movie/${movie.id}/watch/providers`)
        .then(response => {
            const localeList = response.data.results[userLocation.countryCode]?.flatrate
            if (localeList) {
                getDeepLinks()
            }

            setProvidersList(localeList)
        }).catch(err => {
            console.error(err)
            setProvidersList(null)
        })
    }, [movie, userLocation])

    return (
        <Flex gridGap="1rem">
            {!providersList ? (
                <Text fontSize=".9rem" alignSelf="center">
                    There are no providers for this movie in {userLocation.country}.
                </Text>
            ) : (
                providersList.map(provider => {
                    return (
                        <Link
                            key={provider.provider_id}
                            href={deepLinks?.find(deepLink => deepLink.name === provider.provider_name)?.link}
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
                                    opacity={!deepLinks ? .4 : 1}
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
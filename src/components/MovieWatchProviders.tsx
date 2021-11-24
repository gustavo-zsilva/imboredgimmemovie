import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useMovie } from '../hooks/useMovie'

import { api } from '../services/api'
import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'

type UserLocation = {
    country: string,
    countryCode: string,
}

type Provider = {
    logo_path: string,
    provider_name: string,
    provider_id: number,
}

type ProvidersListProps = {    
    flatrate: Provider[],
    buy: Provider[],
    rent: Provider[],
}

export function MovieWatchProviders() {

    const { movie } = useMovie()
    const [providersList, setProvidersList] = useState<Provider[] | null>(null)
    const [userLocation, setUserLocation] = useState<UserLocation>({ country: 'United States', countryCode: 'US' })

    useEffect(() => {
        axios.get<UserLocation>('http://ip-api.com/json', {
            params: {
                fields: 3,
            }
        }).then(response => {
            setUserLocation(response.data)
        }).catch(err => {
            console.error(err)
        })
    }, [])

    useEffect(() => {
        api.get(`/movie/${movie.id}/watch/providers`)
        .then(response => {
            const localeList = response.data.results[userLocation.countryCode]?.flatrate
            setProvidersList(localeList)
        }).catch(err => {
            console.error(err)
            setProvidersList(null)
        })
    }, [movie, userLocation])

    return (
        <Flex gridGap="1rem">
            {!providersList ? (
                <Text fontSize=".9rem">There are no providers for this movie in {userLocation.country}.</Text>
            ) : (
                providersList.map(provider => {
                    return (
                        <Flex
                            key={provider.provider_id}
                            borderRadius=".2rem"
                            overflow="hidden"
                            cursor="pointer"
                        >
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                width={50}
                                height={50}
                                alt={provider.provider_name}
                            />
                        </Flex>
                    )
                })
            )}
        </Flex>
    )
}
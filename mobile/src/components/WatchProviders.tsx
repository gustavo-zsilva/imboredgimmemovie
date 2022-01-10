import React, { useEffect, useState } from "react"

import { useMovie } from "../hooks/useMovie"
import { api } from "../services/api"
import axios from 'axios'

import Icon from 'react-native-vector-icons/AntDesign'
import { Row, Image, Text, Flex } from "native-base"

type WatchProviderProps = {
    provider_name: string,
    provider_id: number,
    logo_path: string,
}

type RegionProps = {
    country: string,
    countryCode: string,
}

export function WatchProviders() {

    const { movie } = useMovie()
    const [watchProviders, setWatchProviders] = useState<WatchProviderProps[]>([])
    const [userRegion, setUserRegion] = useState<RegionProps>({ country: 'United States', countryCode: 'US' })

    useEffect(() => {
        if (!movie) return

        api.get(`/movie/${movie.id}/watch/providers`)
        .then(response => {
            setWatchProviders(response.data.results[userRegion.countryCode]?.flatrate || [])
        })
        .catch(err => {
            console.error(err)
        })
    }, [movie])

    useEffect(() => {
        axios.get('http://ip-api.com/json?fields=country,countryCode')
        .then(response => {
            setUserRegion(response.data)
        })
        .catch(err => {
            console.error(err)
        })
    }, [])

    return (
        <Row mb="20px" h="45px" alignItems="center" space="12px" flexShrink="1">
            {watchProviders.length > 0 && movie ? watchProviders.map(provider => (
                <Image
                    key={provider.provider_id}
                    w="45px"
                    h="45px"
                    bg="white.100"
                    borderRadius="2px"
                    source={{ uri: `https://image.tmdb.org/t/p/original${provider.logo_path}` }}
                    alt={provider.provider_name}
                    accessibilityLabel={provider.provider_name}
                />
            )) : (
                <Row alignItems="baseline" space="8px">
                    <Icon name="exclamationcircleo" size={24} color="#F7F4F3" />
                    <Text>
                        There are no providers for {userRegion.country}.
                    </Text>
                </Row>
            )}
        </Row>
    )
}